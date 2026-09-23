import React, { useState } from "react";
import { X, FileDown, Copy, Check, Share2, Printer, Sparkles, MessageCircle } from "lucide-react";
import jsPDF from "jspdf";

export function ExportShareModal({
  isOpen,
  onClose,
  listings,
  activeProfile
}) {
  const [isCopiedText, setIsCopiedText] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!isOpen || !listings || listings.length === 0) return null;

  const topPick = listings[0];

  // Generate WhatsApp-friendly message text
  const generateWhatsAppSummary = () => {
    let text = `🏆 *Airbnb Deep Match - Comparativo de Acomodações*\n`;
    text += `🎯 *Perfil:* ${activeProfile?.name || "Geral"}\n\n`;
    text += `🥇 *TOP PICK (Melhor Escolha):*\n`;
    text += `*${topPick.title}*\n`;
    text += `📍 ${topPick.location}\n`;
    text += `💰 R$ ${topPick.pricePerNight}/noite | ⭐ ${topPick.rating?.toFixed(2)} (${topPick.reviewCount} avaliações)\n`;
    text += `🎯 Match: ${topPick.match?.matchScore}% | 🛡️ Fidelidade: ${topPick.fidelity?.score}%\n`;
    text += `🔗 ${topPick.url}\n\n`;

    text += `📋 *OUTRAS OPÇÕES COMPARADAS:*\n`;
    listings.slice(1).forEach((l, idx) => {
      text += `\n${idx + 2}️⃣ *${l.title}*\n`;
      text += `💰 R$ ${l.pricePerNight}/noite | Match: ${l.match?.matchScore}% | Fidelidade: ${l.fidelity?.score}%\n`;
      text += `🔗 ${l.url}\n`;
    });

    text += `\n✨ _Relatório gerado pelo Airbnb Deep Match Scanner_`;
    return text;
  };

  const handleCopyWhatsApp = () => {
    const text = generateWhatsAppSummary();
    navigator.clipboard.writeText(text);
    setIsCopiedText(true);
    setTimeout(() => setIsCopiedText(false), 2500);
  };

  // Generate PDF report using jsPDF
  const handleExportPDF = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Header Banner
      doc.setFillColor(255, 56, 92);
      doc.rect(0, 0, 210, 25, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Airbnb Deep Match - Relatorio Comparativo", 14, 15);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Data: ${new Date().toLocaleDateString("pt-BR")} | Perfil: ${activeProfile?.name || "Geral"}`, 14, 21);

      let yPos = 35;

      // Top Pick Section
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("1. MELHOR ESCOLHA (TOP PICK)", 14, yPos);
      yPos += 7;

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(14, yPos, 182, 38, 3, 3, "FD");

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(doc.splitTextToSize(topPick.title, 170), 18, yPos + 7);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Localizacao: ${topPick.location}`, 18, yPos + 16);
      doc.text(`Preco: R$ ${topPick.pricePerNight}/noite | Avaliacao: ${topPick.rating} (${topPick.reviewCount} reviews)`, 18, yPos + 22);
      doc.text(`Match com o Perfil: ${topPick.match?.matchScore}% | Indice de Fidelidade: ${topPick.fidelity?.score}%`, 18, yPos + 28);
      doc.text(`Link: ${topPick.url}`, 18, yPos + 34);

      yPos += 48;

      // All Listings Summary Table
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("2. QUADRO COMPARATIVO GERAL", 14, yPos);
      yPos += 7;

      listings.forEach((l, idx) => {
        if (yPos > 260) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
        doc.roundedRect(14, yPos, 182, 20, 2, 2, "FD");

        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(`${idx + 1}. ${l.title.slice(0, 50)}...`, 18, yPos + 6);

        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(`R$ ${l.pricePerNight}/noite | Match: ${l.match?.matchScore}% | Fidelidade: ${l.fidelity?.score}% (${l.fidelity?.stats?.confirmedByGuests || 0} confirmados, ${l.fidelity?.stats?.alerts || 0} alertas)`, 18, yPos + 12);
        doc.text(`Link: ${l.url}`, 18, yPos + 17);

        yPos += 24;
      });

      doc.save(`airbnb-deep-match-comparativo-${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Erro ao gerar PDF: " + err.message);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Exportar & Compartilhar Relatório</h3>
              <p className="text-xs text-slate-400">Envie o comparativo estruturado para amigos ou salve em PDF</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Options */}
        <div className="p-6 space-y-4">
          {/* PDF Card */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
                <FileDown className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Relatório Executivo em PDF</h4>
                <p className="text-xs text-slate-400">Download de documento formatado com scores e detalhes</p>
              </div>
            </div>

            <button
              onClick={handleExportPDF}
              disabled={isGeneratingPdf}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition shadow-md shadow-rose-600/20 flex items-center space-x-1.5"
            >
              <span>{isGeneratingPdf ? "Gerando..." : "Baixar PDF"}</span>
            </button>
          </div>

          {/* WhatsApp Card */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Resumo Formatado para WhatsApp</h4>
                <p className="text-xs text-slate-400">Copiar texto com emojis, Top Pick e links direto para a área de transferência</p>
              </div>
            </div>

            <button
              onClick={handleCopyWhatsApp}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-md shadow-emerald-600/20 flex items-center space-x-1.5"
            >
              {isCopiedText ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Texto</span>
                </>
              )}
            </button>
          </div>

          {/* WhatsApp preview box */}
          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] font-mono text-slate-400 max-h-36 overflow-y-auto whitespace-pre-line leading-relaxed">
            {generateWhatsAppSummary()}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
