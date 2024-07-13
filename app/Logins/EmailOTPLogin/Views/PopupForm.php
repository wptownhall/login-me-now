<form id="otp-form" class="otp-form">
  <h1 class="title">Login with Email OTP</h1>
  <input id="enter-email" type="email" placeholder="Email Address*" required />
  <button id="send-otp-btn" type="button">Send OTP</button>

  <input id="enter-otp-code" type="text" placeholder="OTP Code*" required style="display: none;" />
  <button id="submit-otp-btn" type="submit" style="display: none;">Submit OTP</button>

  <div class="message"></div>
</form>

<style>
	/* A nice looking Form CSS goes here. */
	.otp-form {
    max-width: 420px;
    margin: 0 auto;
    margin-top: 50px;
    padding: 40px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .otp-form .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 26px;
    color: #333;
  }

  .otp-form input[type="email"],
  .otp-form input[type="text"],
  .otp-form button {
    width: 100%;
    padding: 20px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
    font-size: 16px;
  }

  .otp-form input[type="email"] {
    margin: 0;
  }

  .otp-form button {
    background-color: #28a745;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  .otp-form button:hover {
    background-color: #218838;
  }

  .otp-form button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .otp-form .message {
    margin: 10px 0;
    text-align: center;
    color: #555;
    font-weight: bold;
  }
</style>

<script>
  let endpoint = "<?php echo site_url( 'wp-json/login-me-now/email-otp/' ); ?>";

  /* A nice looking Form JavaScript goes here. */
document.getElementById('send-otp-btn').addEventListener('click', function() {
  const emailInput = document.getElementById('enter-email');
  const messageDiv = document.querySelector('.message');

  if (emailInput.checkValidity()) {
    const email = emailInput.value;

    // Clear previous messages
    messageDiv.textContent = '';

    // Simulate sending OTP via AJAX
    fetch(endpoint + 'send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.message) {
        // Show OTP input and Submit button, hide Send OTP button
        document.getElementById('enter-otp-code').style.display = 'block';
        document.getElementById('submit-otp-btn').style.display = 'block';
        document.getElementById('send-otp-btn').style.display = 'none';
        messageDiv.textContent = data;
      } else {
        messageDiv.textContent = data.message || 'Failed to send OTP. Please try again.';
      }
    })
    .catch(error => {
      console.log('error : ', error );
      messageDiv.textContent = 'An error occurred: ' + error.message;
    });
  } else {
    emailInput.reportValidity();
  }
});

document.getElementById('otp-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const otpInput = document.getElementById('enter-otp-code');
  const emailInput = document.getElementById('enter-email');
  const messageDiv = document.querySelector('.message');

  if (otpInput.checkValidity() && emailInput.checkValidity()) {
    const otp = otpInput.value;
    const email = emailInput.value;

    // Simulate verifying OTP via AJAX
    fetch(endpoint + 'verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: otp,  email: email })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.message) {
        messageDiv.textContent = data;
        window.location.reload(true);
      } else {
        messageDiv.textContent = data.message || 'Invalid OTP. Please try again.';
      }
    })
    .catch(error => {
      console.log('error : ', error );
      messageDiv.textContent = 'An error occurred: ' + error.message;
    });
  } else {
    otpInput.reportValidity();
    emailInput.reportValidity();
  }
});
</script>