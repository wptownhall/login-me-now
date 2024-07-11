<!DOCTYPE html>
<html lang="en"><head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>OTP Verification</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: Arial, sans-serif; background-color: #f2f2f2;" data-new-gr-c-s-check-loaded="14.1187.0" data-gr-ext-installed="">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td bgcolor="#f2f2f2" align="center" style="padding: 20px 0;">
                    <table border="0" cellpadding="0" cellspacing="0" width="500" style="background-color: #ffffff;padding: 20px;border-radius: 5px;box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <tbody>
                            <tr>
                                <td align="center" style="padding: 10px 0; font-size: 16px; color: #333333; font-family: Arial, sans-serif;">
                                    <p style="margin-top: 0px; line-height: 1.5;padding: 0 10px;"> <?php echo $top_title; ?></p>
                                    <p style="font-size: 24px;font-weight: bold;margin: 20px 0;background: #ddd;padding: 15px;border-radius: 5px;"><?php echo esc_html( $otp_code ); ?></p>
                                    <p style="margin: 20px 0;line-height: 1.5;padding: 0 10px;"><?php echo esc_html( $footer_title ); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="font-size: 14px;color: #888888;font-family: Arial, sans-serif;">
                                    <p style="margin: 0;"> <?php echo esc_html( $footer_bottom ); ?></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>