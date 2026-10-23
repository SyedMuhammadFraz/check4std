# Customer journey

Reference: https://satellite-health-customer-journey.nkechiogburia.chatgpt.site/#tests

Entry: `/journey/tests` (also `/#tests`). The header's Customer Journey link opens
this route. Existing catalogue and test-detail order actions enter at
`/journey/centers` with the selected tests. `/pages/:slug` redirects to the matching
journey screen. Existing standalone account/admin/clinician routes remain available.

## Main sequence

1. `tests`: live catalogue, current prices, selection and total.
2. `centers`: sample ZIP search and sample center choices.
3. `details`: patient fields for new users; saved details for signed-in users.
4. `account`: registration, email OTP, or login; verification resumes checkout.
5. `payment`: review, live repricing, acknowledgement, then Stripe card/billing entry.
6. `confirmation`: authenticated order history; never inferred from a URL flag.
7. `requisition`: explicitly labeled sample, not valid for testing.
8. `results`: labeled negative and positive examples, not medical records.
9. `follow-up`: live clinician availability and appointment booking.

Supporting routes reproduce the reference's information, authentication, assessment,
consultation, checkout/payment-collection, profile and status screens. Password reset
has separate email, code and password screens. The backend verifies the reset code
with the new password; the intermediate code screen does not claim verification.

## Service contracts

The implementation uses existing Axios configuration and contracts checked against
the adjacent Check4Std-Backend source. It adds no backend endpoints.

| Capability | Existing service |
| --- | --- |
| Test IDs and prices | `GET /Disease/get-by-name/{name}` |
| Patient sex options | `GET /Lookup/get-by-type?type=Gender` |
| Account status / role | `GET /User/account-status`, `GET /Role/get-by-name/user` |
| Register | Auth `POST /UserRegistration/register-user` |
| Login / email OTP | Token server `POST /connect/token` |
| Resend / password reset | Token server `POST /api/UserRegistration/request-otp/{email}`, `POST /api/UserRegistration/reset-password` |
| Account details | `GET /User/get-by-email`; existing profile update service |
| Payment | `POST /Payment/create-checkout-session` |
| Order confirmation | Authenticated `GET /Order/my-orders` |
| Follow-up | `GET /Doctor/get-all-availbility`, `POST /Doctor/add-appointment` |
| Assessment | Existing questionnaire component and its services |

The existing checkout requires `doctorId: 15`, retained from the original flow.
It accepts disease IDs, not a lab-selection field. Sample center names are never
submitted as real facilities. Backend pricing remains authoritative. Card and
billing information is entered only on Stripe.

The Stripe webhook changes paid orders to Processed. Confirmation matches test IDs
and creation time to the checkout attempt, or lets the patient explicitly select
an order. The backend does not return an order/session ID at checkout creation;
exact session-to-order correlation needs a backend extension.

Per the user's instruction, missing lab-directory, requisition and result services
use labeled dummy values. Samples never create lab records or establish medical
outcomes. The follow-up screen distinguishes sample results from real appointments.

Cart, patient draft and collection preference survive navigation/Stripe through
session storage. Passwords and reset codes are not stored. Logout clears saved
checkout and verification state.

## Verification

`npm.cmd test -- --watchAll=false --runInBand` runs React DOM tests with mocked
services: all 25 routes, patient registration/OTP, password recovery, sample results,
repricing, payment failures/confirmation and clinician booking.
`npm.cmd run build` creates the production build.

Visual browser QA and live transactions require an available browser and the
configured local auth/API servers. No accounts, payments, emails or appointments
were created during implementation.
