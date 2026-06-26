# seo-patch.ps1
# Run from your FleeCon project root:
#   .\seo-patch.ps1

Write-Host "Applying SEO patches..." -ForegroundColor Cyan

$schema = @'
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://fleecon.vercel.app/#business",
        "name": "Fleecon Kenya Ltd",
        "alternateName": "Fleecon Kenya",
        "description": "Construction, renovation and finishing contractors based in Nairobi, Kenya.",
        "url": "https://fleecon.vercel.app",
        "telephone": "+254710678147",
        "email": "davidkiarie6@gmail.com",
        "foundingDate": "2018",
        "slogan": "Filling The Gaps",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nairobi",
          "addressCountry": "KE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -1.286389,
          "longitude": 36.817223
        },
        "areaServed": [
          { "@type": "Country", "name": "Kenya" },
          { "@type": "City", "name": "Nairobi" },
          { "@type": "City", "name": "Kiambu" },
          { "@type": "City", "name": "Naivasha" },
          { "@type": "City", "name": "Mombasa" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
            "opens": "07:00",
            "closes": "17:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "08:00",
            "closes": "14:00"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+254710678147",
          "contactType": "customer service",
          "availableLanguage": ["English","Swahili"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://fleecon.vercel.app/#website",
        "url": "https://fleecon.vercel.app",
        "name": "Fleecon Kenya Ltd",
        "publisher": { "@id": "https://fleecon.vercel.app/#business" }
      }
    ]
  }
  </script>
'@

$pages = @(
  @{
    file   = "index.html"
    title  = "Fleecon Kenya Ltd | Construction Contractors Nairobi, Kenya"
    desc   = "Fleecon Kenya Ltd - NCA-registered construction, renovation and finishing contractors in Nairobi. New builds, roofing, project management across Kenya. Call +254 710 678 147."
    schema = $true
  },
  @{
    file   = "about.html"
    title  = "About Fleecon Kenya Ltd | Construction Contractors Nairobi"
    desc   = "Meet David Kiarie, founder of Fleecon Kenya Ltd. Over 12 years building across Kenya - honest estimates, quality workmanship, NCA registered. Based in Nairobi."
    schema = $false
  },
  @{
    file   = "contact.html"
    title  = "Contact Fleecon Kenya Ltd | Free Quote - Nairobi, Kenya"
    desc   = "Get in touch with Fleecon Kenya Ltd. WhatsApp, call or email for a free site visit and estimate. +254 710 678 147 - davidkiarie6@gmail.com - Nairobi, Kenya."
    schema = $false
  },
  @{
    file   = "projects/index.html"
    title  = "Project Portfolio | Fleecon Kenya Ltd - Construction Nairobi"
    desc   = "View Fleecon Kenya project portfolio - residential builds, renovations, roofing and commercial fit-outs across Nairobi, Karen, Westlands, Kiambu and beyond."
    schema = $false
  },
  @{
    file   = "services/new-builds.html"
    title  = "New Build Contractors Nairobi | Fleecon Kenya Ltd"
    desc   = "New residential and commercial build construction in Nairobi and across Kenya. NCA-registered, honest pricing, quality guaranteed. Call +254 710 678 147."
    schema = $false
  },
  @{
    file   = "services/renovations.html"
    title  = "Home Renovation Contractors Nairobi | Fleecon Kenya Ltd"
    desc   = "Home and commercial renovation services in Nairobi - Karen, Westlands, Kilimani, Lavington and beyond. Honest estimates, clean finish, no surprises."
    schema = $false
  },
  @{
    file   = "services/finishing.html"
    title  = "Building Finishing Services Nairobi | Fleecon Kenya Ltd"
    desc   = "Plastering, tiling, painting and interior finishing in Nairobi and across Kenya. The details done right. Call +254 710 678 147."
    schema = $false
  },
  @{
    file   = "services/roofing.html"
    title  = "Roofing Contractors Nairobi Kenya | Fleecon Kenya Ltd"
    desc   = "Roof installation, replacement and leak repair across Nairobi and Kenya. Tile, iron sheet and pitched roofs. Done once, done properly. Call +254 710 678 147."
    schema = $false
  },
  @{
    file   = "services/project-management.html"
    title  = "Construction Project Management Nairobi | Fleecon Kenya Ltd"
    desc   = "End-to-end construction project management in Nairobi and Kenya. One point of contact, trade coordination, weekly updates. Call +254 710 678 147."
    schema = $false
  },
  @{
    file   = "services/consultation.html"
    title  = "Construction Consultation Nairobi | Fleecon Kenya Ltd"
    desc   = "Free construction consultation and site assessment in Nairobi and Kenya. Honest advice, fair estimates, no obligation. Call +254 710 678 147."
    schema = $false
  }
)

foreach ($page in $pages) {
  $file = $page.file
  if (-not (Test-Path $file)) {
    Write-Host "  SKIP (not found): $file" -ForegroundColor Yellow
    continue
  }

  $c = Get-Content $file -Raw -Encoding UTF8

  $c = $c -replace '(?s)<title>.*?</title>', "<title>$($page.title)</title>"

  $c = $c -replace '<meta name="description" content="[^"]*">', "<meta name=`"description`" content=`"$($page.desc)`">"

  if ($c -notmatch 'og:title') {
    $url = "https://fleecon.vercel.app/" + ($file -replace 'index\.html$', '' -replace '\\', '/')
    $ogTags = "  <meta property=`"og:title`" content=`"$($page.title)`">`n" +
              "  <meta property=`"og:description`" content=`"$($page.desc)`">`n" +
              "  <meta property=`"og:type`" content=`"website`">`n" +
              "  <meta property=`"og:url`" content=`"$url`">`n" +
              "  <meta property=`"og:image`" content=`"https://fleecon.vercel.app/assets/images/logo/logo.png`">`n" +
              "  <meta name=`"twitter:card`" content=`"summary_large_image`">`n" +
              "  <meta name=`"twitter:title`" content=`"$($page.title)`">`n" +
              "  <meta name=`"twitter:description`" content=`"$($page.desc)`">"
    $c = $c -replace '</head>', "$ogTags`n</head>"
  }

  if ($page.schema -and ($c -notmatch 'application/ld\+json')) {
    $c = $c -replace '</head>', "$schema`n</head>"
  }

  Set-Content $file $c -NoNewline -Encoding UTF8
  Write-Host "  Patched: $file" -ForegroundColor Green
}

Write-Host ""
Write-Host "SEO patch complete." -ForegroundColor Cyan
Write-Host "Update robots.txt and sitemap.xml once you have a custom domain." -ForegroundColor Gray