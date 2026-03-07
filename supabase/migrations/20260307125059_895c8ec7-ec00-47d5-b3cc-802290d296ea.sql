
-- Replace overly permissive policy with one scoped to active announcements
DROP POLICY "Anyone authenticated can view active announcements" ON public.announcements;
CREATE POLICY "Authenticated can view active announcements" ON public.announcements FOR SELECT TO authenticated USING (aktif = true);
