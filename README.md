# Memorial/Tribute Donation Form

## Journal

### Day 1

I’m happy about the progress today. The user is able to make a donation using Stripe. The donation is persisted in the database. Upon payment confirmation from Stripe, the donation database record is updated with a success status and the user receives a personalised email thanking them for the donation. The email is sent via Brevo, using a template built in their dashboard.

**For tomorrow, plan to focus on:**

- Must have: _Create the PDF generator to create tribute eCards_
- Must have: _Attach the eCard to the email_
- Should have: _Figure out how to queue jobs (PDF generation and sending emails)_
- Nice to have: _Create a tribute eCard previewer by the form_
- Nice to have: _Make form multistep_

### Day 2

Largely finished with all functionality. The use now receives the custom PDF as an attachment to the email. The form is now multi-step and features a preview. I have been advised not to implement a queue system for jobs at this point. Tomorrow, I will mainly improve styling and fix some minor bugs in the frontend.
