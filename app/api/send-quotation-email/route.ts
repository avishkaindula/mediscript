import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import jsPDF from "jspdf";

export async function POST(request: Request) {
  try {
    const { patientName, patientEmail, prescription, items, deliveryFee, estimatedDelivery, notes, origin } = await request.json();

    if (!patientEmail) {
      return NextResponse.json({ error: "No email provided" }, { status: 400 });
    }

    // Generate PDF
    const doc = new jsPDF();
    doc.text("Quotation", 10, 10);
    doc.text(`Patient: ${patientName || "Unknown"}`, 10, 20);
    doc.text(`Email: ${patientEmail}`, 10, 30);
    doc.text(`Delivery Address: ${prescription.address}`, 10, 40);
    doc.text(`Preferred Delivery Time: ${prescription.preferred_time_slot}`, 10, 50);
    doc.text("Items:", 10, 60);
    items.forEach((item: any, idx: number) => {
      doc.text(
        `${idx + 1}. ${item.drug} - ${item.quantity} - $${item.price} ${item.notes ? "- " + item.notes : ""}`,
        10,
        70 + idx * 10
      );
    });
    doc.text(`Delivery Fee: $${deliveryFee}`, 10, 80 + items.length * 10);
    doc.text(`Estimated Delivery: ${estimatedDelivery}`, 10, 90 + items.length * 10);
    doc.text(`Notes: ${notes}`, 10, 100 + items.length * 10);
    const userQuotationsLink = `${origin}/user/quotations`;
    doc.text(`Accept or reject this quotation: ${userQuotationsLink}`, 10, 110 + items.length * 10);
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: patientEmail,
      subject: "Your Quotation is Ready",
      text: `Dear ${patientName || "User"},\n\nA new quotation has been created for your prescription.\n\nYou can view, accept, or reject your quotation at: ${userQuotationsLink}\n\nThank you!\n\n--\nPharmacy Team`,
      html: `<p>Dear ${patientName || "User"},</p><p>A new quotation has been created for your prescription.</p><p><a href="${userQuotationsLink}">View, accept, or reject your quotation</a></p><p>Thank you!<br/>Pharmacy Team</p>`,
      attachments: [
        {
          filename: "quotation.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    console.error("Quotation email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
} 