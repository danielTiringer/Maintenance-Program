const fetch = require('node-fetch');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: './server/config/config.env' })

// Scheduled tasks
// CRON scheduled to run at 07:30 AM on each weekday
// eslint-disable-next-line no-unused-vars
const queryDueMaintenance = cron.schedule('00 30 07 * * 1-5', async () => {

// CRON for testing only
// const queryDueMaintenance = cron.schedule('* * * * *', async () => {
	console.log("Running a task every X time.");
	const response = await fetch(`http://localhost:${process.env.PORT}/api/assets`, {
		method:'GET',
		headers: {
			'Accept': 'application/json',
		}
	})
	const data = await response.json()
	const overdueAssets = data.filter(asset => {
		return asset.nextScheduledDate == '2020/02/28';
	});
	console.log(overdueAssets);

	const messageHTML = `
		<h1>Good morning,</h1>
		<h3>The following assets are due for maintenance:</h3>
		<ul>
			<li>
				<p>Name: ${overdueAssets[0].assetId}</p>
				<p>Address: ${overdueAssets[0].address}</p>
				<p>Due by: ${overdueAssets[0].nextScheduledDate}</p>
				<ol>Contacts:
					<li>
						<p>${overdueAssets[0].contacts[0].name}</p>
						<p>${overdueAssets[0].contacts[0].phone}</p>
						<p>${overdueAssets[0].contacts[0].email}</p>
					</li>
					<li>
						<p>${overdueAssets[0].contacts[1].name}</p>
						<p>${overdueAssets[0].contacts[1].phone}</p>
						<p>${overdueAssets[0].contacts[1].email}</p>
					</li>
				</ol>
			</li>
		</ul>
		<p>Please review them and set up the required service.</p>
	`;

	let mailOptions = {
		from: `${process.env.EMAIL_USER}@gmail.com`,
		to: `${process.env.EMAIL_USER}@gmail.com`,
		subject: `Maintenance reminder email`,
		html: messageHTML

	};
// eslint-disable-next-line no-unused-vars
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			throw error;
		} else {
			console.log("Email successfully sent!");
		}
	});



});

// Nodemailer Setup

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

// eslint-disable-next-line no-unused-vars
transporter.verify((error, success) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Nodemailer is ready to send messages.');
	}
});

