/**
 * Voxitron's own `customers.id`, once onboarded via
 * supabase/onboarding-template.sql. Used to gate /dashboard/leads to
 * Voxitron's own team, per DASHBOARD_UI.md: the `leads` table has no
 * customer_id (raw form submissions, not tenant-scoped), so this is the
 * one place that needs a real, fixed tenant id rather than the logged-in
 * user's own customer_id.
 *
 * Set this after running supabase/onboarding-template.sql for Voxitron
 * itself (Step 1's `returning id`). Until then it's null and
 * /dashboard/leads stays unreachable for everyone, which is the correct,
 * honest behavior: there's no real Voxitron tenant row to check against yet.
 */
export const VOXITRON_CUSTOMER_ID: string | null = null;
