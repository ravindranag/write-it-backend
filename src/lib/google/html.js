export const getOtpHtmlTemplate = (otp) =>  `
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;800&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', 'sans-serif'; background: white;">
  <div class="container" style="margin: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', 'sans-serif'; padding: 32px;">
    <img class="logo" src="https://i.imgur.com/XbTrc99.png" style="margin: 48px 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', 'sans-serif'; width: 120px; height: 120px;" width="120" height="120">
    <h1 style="margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', 'sans-serif'; font-weight: 800;">Verify your Email</h1>
    <hr style="padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', 'sans-serif'; margin: 32px 0;">
    <p style="margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', 'sans-serif';">Hi, here is your OTP: <strong style="margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', 'sans-serif';">${otp}</strong></p>
    <p style="margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', 'sans-serif';">This expires in the next 5 minutes. Use it to verify your email.</p>
  </div>
</body>
`