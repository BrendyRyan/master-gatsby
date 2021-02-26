const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `
  <div>
    <h2>Your recent order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 minutes.</p>
    <ul>
      ${order
        .map(
          (item) => `
      <li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>
      `
        )
        .join('')}
    </ul>
    <p>Your order total is <strong>${total}</strong> due at pickup.</p>
    <style>
        ul {
          list-style: none
        }
    </style>
  </div>
  `;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  await wait(5000);
  const body = JSON.parse(event.body);
  // check if they have filled out the honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop beep bop zzzzssstt good bye ERR 23234',
      }),
    };
  }
  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field.`,
        }),
      };
    }
  }
  // make sure they have items in their order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order no pizzas? You so silly.`,
      }),
    };
  }

  // send the success or error message
  // send the email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return { statusCode: 200, body: JSON.stringify({ message: 'Success' }) };
};
