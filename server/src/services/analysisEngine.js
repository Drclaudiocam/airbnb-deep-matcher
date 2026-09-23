import { TAXONOMY, DEFAULT_PROFILES } from "./taxonomy.js";

/**
 * Deep Analysis Engine for Airbnb Listings
 * Evaluates host claims, official amenities, and guest reviews to compute
 * verification status, evidence quotes, and Host vs. Guest Fidelity Score.
 */
export class AnalysisEngine {
  /**
   * Helper to extract relevant sentence from long text
   */
  static extractSnippet(text, regex, maxLen = 160) {
    if (!text) return null;
    const match = text.match(regex);
    if (!match) return null;

    const startIdx = Math.max(0, match.index - 40);
    const endIdx = Math.min(text.length, match.index + match[0].length + 120);
    let snippet = text.slice(startIdx, endIdx).trim();
    if (startIdx > 0) snippet = "..." + snippet;
    if (endIdx < text.length) snippet = snippet + "...";
    return snippet;
  }

  /**
   * Analyze a single listing against all taxonomy items or custom criteria
   */
  static analyzeListing(listing, customCriteria = null) {
    const activeTaxonomy = customCriteria || TAXONOMY;
    const criteriaResults = {};

    let totalHostPromises = 0;
    let totalConfirmedByGuests = 0;
    let totalContradictedAlerts = 0;
    let totalGuestBonus = 0;

    const fullHostText = `${listing.title || ""} ${listing.hostDescription || ""}`;
    const officialAmenities = listing.officialAmenities || [];
    const reviews = listing.guestReviews || [];

    // Evaluate each criterion in taxonomy
    for (const [key, item] of Object.entries(activeTaxonomy)) {
      // 1. Official Amenity Check
      const hasOfficialAmenity = (item.officialKeys || []).some((officialKey) =>
        officialAmenities.some((a) => a.toLowerCase().includes(officialKey.toLowerCase()))
      );

      // 2. Host Description Check
      let hostClaim = false;
      let hostSnippet = null;
      for (const pattern of item.positivePatterns || []) {
        if (pattern.test(fullHostText)) {
          hostClaim = true;
          hostSnippet = this.extractSnippet(fullHostText, pattern);
          break;
        }
      }

      // Check if host mentions any negative note (e.g., "Não possui airfryer")
      let hostNegativeNote = false;
      for (const negPattern of item.negativePatterns || []) {
        if (negPattern.test(fullHostText)) {
          hostNegativeNote = true;
          break;
        }
      }

      // 3. Guest Review Evidence Search
      const guestEvidences = [];
      let positiveCount = 0;
      let negativeCount = 0;

      for (const rev of reviews) {
        const revText = rev.text || "";
        
        // Check for negative mentions first
        let isNegative = false;
        let negSnippet = null;
        for (const negPattern of item.negativePatterns || []) {
          if (negPattern.test(revText)) {
            isNegative = true;
            negSnippet = this.extractSnippet(revText, negPattern);
            negativeCount++;
            break;
          }
        }

        if (isNegative) {
          guestEvidences.push({
            type: "negative",
            author: rev.author,
            date: rev.date,
            rating: rev.rating,
            snippet: negSnippet || revText.slice(0, 150),
            fullText: revText
          });
          continue;
        }

        // Check for positive mentions
        let isPositive = false;
        let posSnippet = null;
        for (const posPattern of item.positivePatterns || []) {
          if (posPattern.test(revText)) {
            isPositive = true;
            posSnippet = this.extractSnippet(revText, posPattern);
            positiveCount++;
            break;
          }
        }

        if (isPositive) {
          guestEvidences.push({
            type: "positive",
            author: rev.author,
            date: rev.date,
            rating: rev.rating,
            snippet: posSnippet || revText.slice(0, 150),
            fullText: revText
          });
        }
      }

      // 4. Determine Verification Status
      let status = "NOT_FOUND";
      let statusLabel = "Não Encontrado";
      let statusColor = "gray";
      let confidenceScore = 0; // 0 to 100

      if (negativeCount > 0) {
        status = "ALERT_CONTRADICTED";
        statusLabel = `Alerta: ${negativeCount} relato(s) negativo(s)`;
        statusColor = "red";
        confidenceScore = 20;
        totalContradictedAlerts++;
      } else if ((hasOfficialAmenity || hostClaim) && positiveCount > 0) {
        status = "VERIFIED_CONFIRMED";
        statusLabel = `Confirmado por ${positiveCount} hóspede(s)`;
        statusColor = "emerald";
        confidenceScore = 95 + Math.min(5, positiveCount);
        totalConfirmedByGuests++;
        totalHostPromises++;
      } else if (hasOfficialAmenity || hostClaim) {
        status = "HOST_PROMISE_ONLY";
        statusLabel = "Promessa do Anúncio (Sem relatos)";
        statusColor = "amber";
        confidenceScore = 70;
        totalHostPromises++;
      } else if (positiveCount > 0) {
        status = "GUEST_DISCOVERED";
        statusLabel = `Descoberto por ${positiveCount} hóspede(s)`;
        statusColor = "indigo";
        confidenceScore = 90;
        totalGuestBonus++;
      }

      // Details note
      let detailTag = null;
      if (item.detailsExtractor && (hostSnippet || guestEvidences.length > 0)) {
        const fullEvidence = `${hostSnippet || ""} ${guestEvidences.map((e) => e.snippet).join(" ")}`;
        detailTag = item.detailsExtractor(fullEvidence);
      }

      criteriaResults[key] = {
        criterionId: key,
        label: item.label,
        category: item.category,
        status,
        statusLabel,
        statusColor,
        confidenceScore,
        hasOfficialAmenity,
        hostClaim,
        hostSnippet,
        hostNegativeNote,
        guestEvidences,
        positiveReviewsCount: positiveCount,
        negativeReviewsCount: negativeCount,
        detailTag
      };
    }

    // 5. Calculate Fidelity Score (Promessa vs Realidade)
    // Formula: Based on confirmed promises vs contradicted claims
    let fidelityScore = 85;
    if (totalHostPromises > 0) {
      const confirmationRatio = totalConfirmedByGuests / totalHostPromises;
      fidelityScore = Math.round(70 + confirmationRatio * 25 - totalContradictedAlerts * 15 + totalGuestBonus * 5);
    } else if (totalConfirmedByGuests > 0) {
      fidelityScore = 90;
    }
    fidelityScore = Math.max(30, Math.min(99, fidelityScore));

    let fidelityBadge = "Alta Fidelidade";
    let fidelityColor = "emerald";
    if (fidelityScore < 65) {
      fidelityBadge = "Atenção: Ressalvas de Hóspedes";
      fidelityColor = "red";
    } else if (fidelityScore < 80) {
      fidelityBadge = "Média Fidelidade (Poucas Evidências)";
      fidelityColor = "amber";
    }

    return {
      ...listing,
      criteriaResults,
      fidelity: {
        score: fidelityScore,
        badge: fidelityBadge,
        color: fidelityColor,
        stats: {
          hostPromises: totalHostPromises,
          confirmedByGuests: totalConfirmedByGuests,
          alerts: totalContradictedAlerts,
          guestDiscoveries: totalGuestBonus
        }
      }
    };
  }

  /**
   * Calculate Match Score for a listing based on a specific Search Profile
   */
  static calculateProfileMatch(analyzedListing, profile) {
    if (!profile || !profile.criteria || profile.criteria.length === 0) {
      return { matchScore: 85, missingRequired: [], matchedCount: 0, totalCriteria: 0 };
    }

    let totalWeight = 0;
    let earnedWeight = 0;
    const missingRequired = [];
    let matchedCount = 0;

    for (const c of profile.criteria) {
      const weight = c.weight || 1;
      totalWeight += weight;

      const result = analyzedListing.criteriaResults[c.id];
      if (!result) continue;

      if (result.status === "VERIFIED_CONFIRMED" || result.status === "GUEST_DISCOVERED") {
        earnedWeight += weight * 1.0;
        matchedCount++;
      } else if (result.status === "HOST_PROMISE_ONLY") {
        earnedWeight += weight * 0.75;
        matchedCount++;
      } else if (result.status === "ALERT_CONTRADICTED") {
        earnedWeight += 0;
        if (c.required) {
          missingRequired.push(result.label);
        }
      } else if (result.status === "NOT_FOUND") {
        if (c.required) {
          missingRequired.push(result.label);
        }
      }
    }

    let matchPercentage = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
    // Penalty if missing required items
    if (missingRequired.length > 0) {
      matchPercentage = Math.max(10, matchPercentage - missingRequired.length * 15);
    }

    return {
      matchScore: matchPercentage,
      missingRequired,
      matchedCount,
      totalCriteria: profile.criteria.length
    };
  }

  /**
   * Run comparison on multiple listings with a chosen profile
   */
  static compareListings(listings, profile = DEFAULT_PROFILES[0]) {
    const analyzed = listings.map((l) => {
      const analyzedListing = this.analyzeListing(l);
      const matchData = this.calculateProfileMatch(analyzedListing, profile);
      return {
        ...analyzedListing,
        match: matchData
      };
    });

    // Sort by Match Score descending, then Fidelity Score descending
    analyzed.sort((a, b) => b.match.matchScore - a.match.matchScore || b.fidelity.score - a.fidelity.score);

    // Identify winners per category / criterion
    const categoryWinners = {};
    for (const [key, item] of Object.entries(TAXONOMY)) {
      let bestListingId = null;
      let highestScore = -1;

      for (const l of analyzed) {
        const res = l.criteriaResults[key];
        if (res && res.confidenceScore > highestScore && res.confidenceScore >= 70) {
          highestScore = res.confidenceScore;
          bestListingId = l.id;
        }
      }

      if (bestListingId) {
        categoryWinners[key] = {
          winnerListingId: bestListingId,
          score: highestScore,
          label: item.label
        };
      }
    }

    return {
      profile,
      listings: analyzed,
      topPick: analyzed[0] || null,
      categoryWinners
    };
  }
}
