-- =========================================================================
-- ÇAĞ TEKNİK YEDEK PARÇA KATALOG SİSTEMİ - SUPABASE VERİTABANI ŞEMASI
-- GÜVENLİK MODELİ: Row Level Security (RLS) & Role-Based Access Control
-- =========================================================================

-- 1. Yetkili Personel Profilleri Tablosu
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    full_name text not null,
    role text check (role in ('admin', 'service_manager', 'technician')) default 'technician',
    branch text default 'Merkez Servis',
    phone text,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Markalar Tablosu (Atalay, Empero, Öztiryakiler)
create table if not exists public.brands (
    id uuid default gen_random_uuid() primary key,
    slug text unique not null,
    name text not null,
    origin text default 'Türkiye',
    logo_url text,
    description text,
    drive_folder_url text,
    official_website text,
    device_count integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Cihaz Kategorileri (Pişirme, Bulaşıkhane, Soğutma, Hazırlık vb.)
create table if not exists public.categories (
    id uuid default gen_random_uuid() primary key,
    brand_id uuid references public.brands(id) on delete cascade not null,
    slug text not null,
    name text not null,
    icon_name text,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(brand_id, slug)
);

-- 4. Cihazlar / Modeller Tablosu
create table if not exists public.devices (
    id uuid default gen_random_uuid() primary key,
    brand_id uuid references public.brands(id) on delete cascade not null,
    category_id uuid references public.categories(id) on delete set null,
    model_code text not null,
    model_name text not null,
    series text,
    energy_type text check (energy_type in ('Elektrik', 'Gaz', 'Hibrit', 'Motorsuz')),
    production_years text,
    technical_specs jsonb default '{}'::jsonb,
    manual_url text,
    cover_image_url text,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Patlatılmış Şemalar (Exploded View Diagrams)
create table if not exists public.diagrams (
    id uuid default gen_random_uuid() primary key,
    device_id uuid references public.devices(id) on delete cascade not null,
    sheet_no text default '01',
    title text not null,
    diagram_image_url text not null,
    high_res_pdf_url text,
    version text default '1.0',
    sort_order integer default 1,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Parçalar Tablosu
create table if not exists public.parts (
    id uuid default gen_random_uuid() primary key,
    diagram_id uuid references public.diagrams(id) on delete cascade not null,
    item_no integer not null, -- Patlatılmış resimdeki pozisyon numarası (1, 2, 3...)
    part_code text not null,  -- Üretici orijinal parça referansı
    part_name text not null,  -- Parça adı (TR)
    technical_description text,
    compatible_models text[],
    unit text default 'Adet',
    is_critical boolean default false, -- Kritik aşınma parçası mı?
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(diagram_id, item_no)
);

-- 7. Şema Hotspot Noktaları (Koordinatlar % cinsinden 0-100)
create table if not exists public.diagram_hotspots (
    id uuid default gen_random_uuid() primary key,
    diagram_id uuid references public.diagrams(id) on delete cascade not null,
    part_id uuid references public.parts(id) on delete cascade not null,
    item_no integer not null,
    x_percent numeric(5,2) not null check (x_percent between 0 and 100),
    y_percent numeric(5,2) not null check (y_percent between 0 and 100),
    pin_label text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLİTİKALARI (GÜVENLİK DUVARI)
-- Sadece Çağ Teknik kimliği doğrulanmış personeli okuyabilir.
-- =========================================================================

alter table public.profiles enable row level security;
alter table public.brands enable row level security;
alter table public.categories enable row level security;
alter table public.devices enable row level security;
alter table public.diagrams enable row level security;
alter table public.parts enable row level security;
alter table public.diagram_hotspots enable row level security;

-- Personel Profilleri: Sadece kendi profilini veya admin ise görebilir
create policy "Yetkili personel kendi profilini görebilir"
    on public.profiles for select
    to authenticated
    using (auth.uid() = id);

-- Katalog Verileri: Sadece giriş yapmış Çağ Teknik personeli okuyabilir
create policy "Yetkili personel markaları görebilir"
    on public.brands for select
    to authenticated
    using (is_active = true);

create policy "Yetkili personel kategorileri görebilir"
    on public.categories for select
    to authenticated
    using (true);

create policy "Yetkili personel cihazları görebilir"
    on public.devices for select
    to authenticated
    using (is_active = true);

create policy "Yetkili personel şemaları görebilir"
    on public.diagrams for select
    to authenticated
    using (true);

create policy "Yetkili personel parçaları görebilir"
    on public.parts for select
    to authenticated
    using (true);

create policy "Yetkili personel hotspotları görebilir"
    on public.diagram_hotspots for select
    to authenticated
    using (true);
