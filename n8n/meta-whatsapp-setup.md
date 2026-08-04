# Meta WhatsApp Business Platform setup guide

Do this once per Meta Business Account (Voxitron's own account covers every
customer's numbers, they don't each need a separate Meta account). As of
2026-08-04 none of this has been started. This is the prerequisite for
`n8n/voxitron-whatsapp-agent.json` to receive or send any real messages.

## 1. Create a Meta Business Account

1. Go to [business.facebook.com](https://business.facebook.com) and create a
   Business Account for Voxitron if one doesn't already exist.
2. You'll need a Facebook account to administer it, doesn't have to be
   personal, a dedicated Voxitron admin account is fine.

## 2. Create a WhatsApp Business Platform app

1. Go to [developers.facebook.com](https://developers.facebook.com) > My Apps
   > Create App.
2. Choose "Business" as the app type, link it to the Business Account from
   step 1.
3. Add the "WhatsApp" product to the app.

## 3. Add a phone number

1. In the app's WhatsApp > API Setup page, either use the free test number
   Meta provides (fine for development, limited to a handful of verified
   recipient numbers) or add a real business number.
2. Adding a real number requires it not already be active on the regular
   WhatsApp or WhatsApp Business consumer app, Meta will walk through
   verifying it by SMS/call.
3. Repeat this step for each additional number a customer operates, all
   under the same app (per the multi-number-per-customer schema).
4. **For each number, copy its `phone_number_id`** (shown on the API Setup
   page, a numeric string, not the phone number itself). This is what goes
   into `customer_whatsapp_numbers.whatsapp_number` in Supabase, see
   `supabase/onboarding-template.sql`.

## 4. Generate a permanent access token

The API Setup page's default token expires in 24 hours, fine for testing,
not for production.

1. Go to Business Settings > Users > System Users.
2. Create a System User (e.g. "Voxitron n8n"), role: Admin (or a scoped
   custom role covering `whatsapp_business_messaging` at minimum).
3. Assign the WhatsApp app from step 2 to this System User with full
   control.
4. Generate a token for the System User, select the `whatsapp_business_messaging`
   and `whatsapp_business_management` permissions, no expiration.
5. Copy this token immediately, Meta only shows it once. This is what goes
   into the "WhatsApp Cloud API token" Header Auth credential in n8n (see
   `n8n/README.md`), as `Authorization: Bearer <token>`.

## 5. Set the webhook verify token

1. Pick any random string, this is shared between Meta and n8n to prove
   webhook subscription requests are genuine, it is not a secret used for
   message content, just for the verification handshake.
2. Set it as the `VOXITRON_WA_VERIFY_TOKEN` environment variable in n8n
   (n8n instance settings, or the `.env` file on the n8n server).

## 6. Register the webhook with Meta

1. Once `n8n/voxitron-whatsapp-agent.json` is imported into n8n with real
   credentials (see `n8n/README.md`), activate it and copy its production
   webhook URL. Both the verify (`GET`) and receive (`POST`) paths resolve
   to the same URL, n8n routes internally by HTTP method.
2. In the app's WhatsApp > Configuration page, set that URL as the Callback
   URL, and enter the verify token from step 5.
3. Click "Verify and Save". Meta will call the `GET` path immediately, if
   `Verify Token Matches?` in the workflow doesn't return the challenge
   correctly, this fails here, check the `VOXITRON_WA_VERIFY_TOKEN` value
   matches exactly.
4. Subscribe to the `messages` webhook field (not `messaging_postbacks` or
   others, just `messages` is needed for this workflow).

## 7. Test end to end

1. Send a WhatsApp message from a real phone to the number from step 3 (if
   using the free test number, the recipient phone must be pre-verified in
   the app's API Setup page first).
2. Check the n8n execution log for the workflow, confirm it ran and reached
   `Send WhatsApp Reply` without error.
3. Confirm rows landed in Supabase: `select * from conversations order by
   started_at desc limit 5;` and `select * from messages order by sent_at
   desc limit 5;` in the SQL Editor.
4. If nothing happens at all, re-check step 6's subscription and step 4's
   token permissions first, those are the most common points of failure.

## Ongoing: each new customer number

Repeat step 3 (add the number, copy its `phone_number_id`) and then run
`supabase/onboarding-template.sql`'s Step 3 to register that number against
the right `customer_id`. Steps 1, 2, 4, 5, and 6 only happen once, they're
account/app-level, not per-number.
