-- Create the 'website' bucket if it doesn't exist, and make it public
insert into storage.buckets (id, name, public)
values ('website', 'website', true)
on conflict (id) do update set public = true;

-- Allow anyone to read (SELECT) objects in the website bucket
create policy "Public read website"
  on storage.objects for select
  using ( bucket_id = 'website' );

-- Allow anyone to upload (INSERT) to the website bucket
create policy "Public upload website"
  on storage.objects for insert
  with check ( bucket_id = 'website' );

-- Allow anyone to delete objects in the website bucket (for future image removal)
create policy "Public delete website"
  on storage.objects for delete
  using ( bucket_id = 'website' );
