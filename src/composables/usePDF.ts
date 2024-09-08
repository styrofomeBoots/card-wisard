import jsPDF from "jspdf";
import { CardData } from "../types/cardWisard.types";

export const usePdf = (): { createPdf: (cards: CardData[]) => void } => {
  const createPdf = (cards: CardData[]): void => {
    const doc = new jsPDF("portrait", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    const columns = 2;
    const rows = 5;
    const cellPadding = 5;
    const cellWidth = (pageWidth - cellPadding * 2) / columns;
    const cellHeight = (pageHeight - cellPadding * 2) / rows;

    const startX = cellPadding;
    const startY = cellPadding;

    let itemIndex = 0;
    const itemsPerPage = columns * rows;

    while (itemIndex < cards.length) {
      if (itemIndex > 0 && itemIndex % itemsPerPage === 0) {
        doc.addPage();
      }

      // Calculate the current row and column on the page
      const currentIndexOnPage = itemIndex % itemsPerPage;
      const row = Math.floor(currentIndexOnPage / columns);
      const col = currentIndexOnPage % columns;

      // Draw the rectangle for the cell
      doc.rect(
        startX + col * cellWidth,
        startY + row * cellHeight,
        cellWidth,
        cellHeight
      );

      doc.setFontSize(24);
      let textX = startX + col * cellWidth + 4;
      let textY = startY + row * cellHeight + 9;
      doc.text(cards[itemIndex].name, textX, textY);

      doc.setFontSize(18);
      textX = startX + col * cellWidth + 4;
      textY = startY + row * cellHeight + 17;
      const kpis = `UPH: ${cards[itemIndex].uph}  APH: ${cards[itemIndex].aph}`;
      doc.text(kpis, textX, textY);

      textY = startY + row * cellHeight + 24;
      doc.text(`LOI: ${cards[itemIndex].loi}`, textX, textY);

      doc.setFontSize(18);
      textY = startY + row * cellHeight + 33;
      const sections = doc.splitTextToSize(
        cards[itemIndex].sections.join(" > "),
        cellWidth - 8
      );
      doc.text(sections, textX, textY);

      doc.setFontSize(16);
      textX = startX + col * cellWidth + cellWidth - 4;
      textY = startY + row * cellHeight + cellHeight - 4;
      doc.text(cards[itemIndex].breakTime, textX, textY, { align: "right" });

      itemIndex++;
    }

    // Save the PDF
    doc.save("grid.pdf");
  };
  return { createPdf };
};
