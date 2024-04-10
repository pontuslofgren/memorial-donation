# Memorial/Tribute Donation Form

## Journal
### Day 1
I’m happy about the progress today. The user is able to make a donation using Stripe. The donation is persisted in the database. Upon payment confirmation from Stripe, the donation database record is updated with a success status and the user receives a personalised email thanking them for the donation. The email is sent via Brevo, using a template built in their dashboard.

**For tomorrow, plan to focus on:**

- Must have: *Create the PDF generator to create tribute eCards*
- Must have: *Attach the eCard to the email*
- Should have: *Figure out how to queue jobs (PDF generation and sending emails)*
- Nice to have: *Create a tribute eCard previewer by the form*
- Nice to have: *Make form multistep*
