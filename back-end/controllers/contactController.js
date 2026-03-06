import resend from "../config/sendEmailConfig.js";

export const sendContactMessage = async (req, res) => {

  const { name, email, message } = req.body;

  try {

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["bogululoforexnews.bg@proton.me"],
      subject: "New Contact Message",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    if (error) {
      console.error(error);
      return res.status(500).json(error);
    }

    res.status(200).json({
      message: "Email sent successfully",
      data
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Email failed"
    });

  }

};