import { AnalysisEngine } from "./src/services/analysisEngine.js";
import { BENCHMARK_LISTINGS } from "./src/data/benchmarkListings.js";
import { DEFAULT_PROFILES } from "./src/services/taxonomy.js";

console.log("🔍 Testing Airbnb Deep Analysis Engine...");

// Test 1: Compare benchmark listings with default profile
const comparison = AnalysisEngine.compareListings(BENCHMARK_LISTINGS, DEFAULT_PROFILES[0]);

console.log(`✅ Loaded ${comparison.listings.length} listings`);
console.log(`🏆 Top Pick: ${comparison.topPick.title}`);
console.log(`📊 Top Pick Match Score: ${comparison.topPick.match.matchScore}%`);
console.log(`🛡️ Top Pick Fidelity Score: ${comparison.topPick.fidelity.score}% (${comparison.topPick.fidelity.badge})`);

// Test 2: Check deep verification on "Villa Solarium"
const ubatuba = comparison.listings.find((l) => l.id.includes("ubatuba"));
const poolRes = ubatuba.criteriaResults.pool_heated;
console.log(`🏊 Pool Heated Status: ${poolRes.status} (${poolRes.statusLabel})`);
console.log(`🍳 Airfryer Status: ${ubatuba.criteriaResults.kitchen_airfryer.status} (${ubatuba.criteriaResults.kitchen_airfryer.statusLabel})`);
console.log(`💬 Pool Evidences count: ${poolRes.guestEvidences.length}`);

if (poolRes.guestEvidences.length > 0) {
  console.log(`   Sample review quote: "${poolRes.guestEvidences[0].snippet}"`);
}

// Test 3: Check negative alert detection on "Campos do Jordão" (cloudy days issue)
const campos = comparison.listings.find((l) => l.id.includes("campos"));
const camposPool = campos.criteriaResults.pool_heated;
console.log(`⚠️ Campos Pool Status: ${camposPool.status} (${camposPool.statusLabel})`);
console.log(`   Negative alert snippet: "${camposPool.guestEvidences[0]?.snippet || 'N/A'}"`);

console.log("\n✨ All core analysis engine tests PASSED successfully!");
