# Golden Cut Parturi — konversio-optimoitu sivustokartta

## Positio

Golden Cutin ei kannata näyttää tai kuulostaa liian eksklusiiviselta spa-luksukselta. Paras myyntikulma on luotettava arjen premium:

```txt
Nopea, tarkka ja helposti saavutettava miesten parturi Espoon keskuksessa — ilman ajanvarausta.
```

Ydinviesti:

- hyvä jälki
- reilu hinta
- nopea palvelu
- vahva asiakastyytyväisyys
- erinomainen sijainti Espoon aseman vieressä

Sivuston pitää toimia kolmena myyntikanavana:

1. Ajanvarauskone
2. Lahjakorttikauppa
3. Pieni tuotemyyntikanava

---

## Priorisoitu MVP-sivustokartta

```txt
/
├── /ajanvaraus
├── /palvelut
├── /hinnasto
├── /lahjakortti
├── /tuotteet
│   └── /tuotteet/[tuote]
├── /galleria
├── /yhteystiedot
├── /ostoskori
├── /kassa
└── /kiitos
```

Alkuvaiheessa nämä voidaan toteuttaa myös yhden sivun ankkureina:

```txt
/#ajanvaraus
/#palvelut
/#hinnasto
/#lahjakortti
/#tuotteet
/#kuvat
/#sijainti
```

Ei heti välttämätön:

```txt
/meista
/blogi
/usein-kysytyt-kysymykset
```

---

## 1. Etusivu

**Tavoite:** ohjata käyttäjä nopeasti varaamaan aika, ostamaan lahjakortti tai tutustumaan palveluihin.

**URL:** `/`

### Sisältöjärjestys

1. Hero
   - Otsikko: **6 vuotta tarkkaa parturityötä — paikallisten luottopaikka.**
   - Alaotsikko: Modernit miesten leikkaukset, viimeistellyt fade-tyylit ja rento palvelu ilman turhaa säätöä.
   - Pää-CTA: **Varaa aika**
   - Toissijainen CTA: **Osta lahjakortti**

2. Nopeat valinnat
   - Miesten leikkaus
   - Fade / Skin fade
   - Parta
   - Hiukset + parta
   - Lasten leikkaus, jos relevantti

3. Luottamusblokki
   - Toiminut samalla paikalla 6 vuotta
   - Vahva paikallinen maine
   - Asiakasarviot / Google Reviews
   - Kuvia oikeista töistä

4. Suosituimmat palvelut
   - Palvelu
   - Lyhyt kuvaus
   - Hinta alkaen
   - CTA: **Varaa tämä palvelu**

5. Lahjakortti-nosto
   - Anna lahjaksi siisti leikkaus
   - CTA: **Osta lahjakortti**

6. Tuotenosto
   - 3–4 suosikkituotetta
   - CTA: **Katso tuotteet**

7. Sijainti ja aukiolo
   - Osoite
   - Kartta
   - Aukioloajat
   - CTA: **Navigoi perille**

---

## 2. Ajanvaraus

**Tavoite:** saada käyttäjä kolmannen osapuolen ajanvaraukseen mahdollisimman nopeasti.

**URL:** `/ajanvaraus`

### Rakenne

1. Hero
   - Otsikko: **Varaa aikasi Golden Cut Parturiin**
   - Alaotsikko: Valitse palvelu, aika ja parturi. Vahvista varaus suoraan ajanvarausjärjestelmässä.
   - CTA: **Siirry ajanvaraukseen**

2. Palvelukohtaiset CTA:t
   - Miesten leikkaus → ajanvarauslinkki
   - Fade / Skin fade → ajanvarauslinkki
   - Parta → ajanvarauslinkki
   - Hiukset + parta → ajanvarauslinkki

3. Ennen varausta
   - Peruutusehdot
   - Maksutavat
   - Saapumisohje
   - Arvioitu kesto

4. Fallback-konversio
   - Etkö löydä sopivaa aikaa?
   - CTA: **Soita meille**
   - CTA: **Lähetä WhatsApp-viesti**, jos käytössä

### Tekninen huomio

Ajanvaraus kannattaa avata joko:

- samassa näkymässä upotuksena, jos kolmas osapuoli tukee sitä
- tai selkeänä ulkoisena linkkinä, jossa tracking säilyy

Mittaa:

```txt
click_book_appointment
service_booking_click
booking_provider_redirect
```

---

## 3. Lahjakortti Store

**Tavoite:** suora osto mahdollisimman vähillä klikeillä.

**URL:** `/lahjakortti`

### Rakenne

1. Hero
   - Otsikko: **Lahjakortti Golden Cut Parturiin**
   - Alaotsikko: Helppo lahja miehelle, joka arvostaa siistiä tyyliä ja laadukasta parturityötä.
   - CTA: **Osta lahjakortti**

2. Lahjakorttivaihtoehdot
   - 30 €
   - 50 €
   - 75 €
   - 100 €
   - Vapaavalintainen summa

3. Tuotekortin sisältö
   - Summa
   - Lyhyt käyttötarkoitus
   - Sopii leikkaukseen, partaan tai tuotteisiin
   - CTA: **Lisää ostoskoriin**

4. Ostoprosessi
   - Ostoskori
   - Yhteystiedot
   - Maksu
   - Digitaalinen toimitus sähköpostiin

5. Usein kysytyt kysymykset
   - Kauanko lahjakortti on voimassa?
   - Voiko sen käyttää kaikkiin palveluihin?
   - Saako sen sähköpostiin?
   - Voiko sen tulostaa?

### Konversioparannus

Lisää lahjakorttisivulle valmiit käyttötarkoitukset:

- Isälle
- Puolisolle
- Veljelle
- Ystävälle
- Työkaverille

---

## 4. Tuotemyynti / pieni verkkokauppa

**Tavoite:** myydä suosikkituotteita nykyisille asiakkaille ja kasvattaa keskiostosta.

**URL:** `/tuotteet`

### Pääsivu

1. Hero
   - Otsikko: **Parturin suosikkituotteet kotiin**
   - Alaotsikko: Valitut hius- ja partatuotteet, joita käytämme ja suosittelemme itse.
   - CTA: **Katso tuotteet**

2. Kategoriat
   - Hiusvahat
   - Pomadet
   - Shampoot
   - Partaöljyt
   - Viimeistelytuotteet
   - Lahjapaketit

3. Suosituimmat tuotteet
   - 4–8 tuotetta
   - Parturin valinta -merkintä
   - Lyhyt käyttösuositus
   - CTA: **Lisää ostoskoriin**

4. Ristiinmyynti
   - Sopii fade-leikkauksen viimeistelyyn
   - Paras lyhyelle hiukselle
   - Hyvä valinta mattaiselle lopputulokselle

### Tuotesivu

**URL:** `/tuotteet/[tuote]`

Sisältö:

1. Tuotekuva
2. Tuotenimi
3. Hinta
4. Lyhyt hyötylupaus
5. Kenelle tuote sopii
6. Käyttöohje
7. CTA: **Lisää ostoskoriin**
8. Suositellut lisätuotteet
9. Voit ostaa tuotteen myös parturikäynnin yhteydessä

---

## 5. Palvelut

**Tavoite:** auttaa asiakasta valitsemaan oikea palvelu ja siirtymään ajanvaraukseen.

**URL:** `/palvelut`

### Rakenne

1. Hero
   - Otsikko: **Miesten leikkaukset, fade-tyylit ja partapalvelut**
   - CTA: **Varaa aika**

2. Palvelulista
   - Miesten leikkaus
   - Fade
   - Skin fade
   - Hiukset + parta
   - Parran muotoilu
   - Lasten leikkaus, jos relevantti

3. Jokaiselle palvelulle
   - Kuvaus
   - Kesto
   - Hinta
   - Kenelle sopii
   - CTA: **Varaa tämä palvelu**

4. Laatuargumentti
   - Tarkka viimeistely
   - Modernit tekniikat
   - Selkeä tyylineuvonta

---

## 6. Hinnasto

**Tavoite:** poistaa epävarmuus ja nopeuttaa varausta.

**URL:** `/hinnasto`

| Palvelu | Hinta | Kesto | CTA |
|---|---:|---:|---|
| Miesten leikkaus | xx € | xx min | Varaa |
| Fade | xx € | xx min | Varaa |
| Skin fade | xx € | xx min | Varaa |
| Hiukset + parta | xx € | xx min | Varaa |
| Parran muotoilu | xx € | xx min | Varaa |

Hinnastosivulla CTA pitää olla jokaisen rivin yhteydessä.

---

## 7. Galleria / Työt

**Tavoite:** todistaa laatu visuaalisesti.

**URL:** `/galleria`

### Rakenne

1. Hero
   - Otsikko: **Katso Golden Cutin työnjälki**

2. Kategoriat
   - Fade
   - Skin fade
   - Klassinen leikkaus
   - Parta
   - Ennen / jälkeen

3. Kuvakortit
   - Kuva
   - Tyyli
   - Lyhyt kuvaus
   - CTA: **Varaa samanlainen tyyli**

Konversioidea:

```txt
Näytä tämä tyyli parturille
Varaa fade-leikkaus
```

---

## 8. Meistä

**Tavoite:** vahvistaa luottamusta ja paikallista asemaa.

**URL:** `/meista`

### Rakenne

1. Hero
   - Otsikko: **Paikallinen parturi, johon asiakkaat palaavat**

2. Tarina
   - 6 vuotta samalla paikalla
   - Asiakassuhteet
   - Palvelufilosofia
   - Laadun ja viimeistelyn merkitys

3. Tiimi
   - Parturit
   - Erikoisosaaminen
   - Lyhyt henkilökohtainen esittely
   - CTA: **Varaa aika**

4. Arvot
   - Tarkkuus
   - Rentous
   - Reilu palvelu
   - Moderni tyyli

---

## 9. Yhteystiedot

**Tavoite:** tehdä saapumisesta ja yhteydenotosta helppoa.

**URL:** `/yhteystiedot`

### Rakenne

1. Osoite
2. Kartta
3. Aukioloajat
4. Puhelinnumero
5. Sähköposti, jos käytössä
6. Sosiaalisen median linkit
7. Pysäköintiohjeet
8. CTA: **Varaa aika**
9. CTA: **Navigoi perille**

---

## 10. Ostoskori ja kassa

### Ostoskori

**URL:** `/ostoskori`

Sisältö:

- Tuotteet
- Lahjakortit
- Määrät
- Hinnat
- Toimitustapa
- CTA: **Siirry kassalle**

### Kassa

**URL:** `/kassa`

Sisältö:

- Yhteystiedot
- Toimitustapa
- Maksutapa
- Tilauksen yhteenveto
- CTA: **Maksa tilaus**

### Kiitossivu

**URL:** `/kiitos`

Sisältö:

- Tilausvahvistus
- Lahjakortin toimitustiedot
- Tuotesuositus
- CTA: **Varaa aika**
- CTA: **Seuraa Instagramissa / TikTokissa**

---

## Suositeltu päävalikko

### Desktop

1. Palvelut
2. Hinnasto
3. Lahjakortti
4. Tuotteet
5. Galleria
6. Yhteystiedot
7. **Varaa aika** — korostettu painike

### Mobile

1. **Varaa aika**
2. Palvelut
3. Lahjakortti
4. Tuotteet
5. Yhteystiedot

Mobile-näkymässä ajanvarauksen pitää olla sticky-painikkeena:

```txt
Varaa aika
```

---

## Sivuston konversiopolut

| Polku | Reitti |
|---|---|
| Uusi asiakas | Etusivu → Palvelut → Hinnasto → Ajanvaraus |
| Asiakas tietää jo mitä haluaa | Etusivu → Varaa aika |
| Lahjan ostaja | Etusivu → Lahjakortti → Kassa → Kiitos |
| Nykyinen asiakas | Etusivu → Tuotteet → Tuotesivu → Kassa |
| Epävarma asiakas | Etusivu → Galleria → Palvelut → Ajanvaraus |

---

## Footer-rakenne

### Golden Cut Parturi

- Lyhyt kuvaus
- Osoite
- Aukioloajat
- Puhelinnumero

### Palvelut

- Miesten leikkaus
- Fade
- Skin fade
- Parta
- Hiukset + parta

### Osta

- Lahjakortti
- Tuotteet
- Ostoskori

### Seuraa

- Instagram
- TikTok
- Google Business Profile

### Lakisivut

- Tietosuojaseloste
- Toimitusehdot
- Palautusehdot
- Evästeasetukset

---

## Tärkeimmät CTA:t

| Sivu | Ensisijainen CTA | Toissijainen CTA |
|---|---|---|
| Etusivu | Varaa aika | Osta lahjakortti |
| Ajanvaraus | Siirry ajanvaraukseen | Soita meille |
| Lahjakortti | Osta lahjakortti | Katso palvelut |
| Tuotteet | Lisää ostoskoriin | Varaa aika |
| Palvelut | Varaa tämä palvelu | Katso hinnasto |
| Hinnasto | Varaa aika | Katso galleria |
| Galleria | Varaa samanlainen tyyli | Katso palvelut |
| Yhteystiedot | Varaa aika | Navigoi perille |

---

## Required integrations

| Integration | Needed value |
|---|---|
| Booking provider | Third-party booking URL or embeddable widget |
| Gift card checkout | Store / checkout URL for gift cards |
| Product checkout | Store / checkout URL or product collection URL |
| Cart | Product + gift card cart state |
| Payment | Stripe / Shopify / other checkout provider |
| Analytics | GA4 / gtag ID |
| Lead fallback | Phone, Instagram, WhatsApp and email |

## Production rule

Do not show a fake checkout flow. If the booking, gift card or product checkout provider URL is not ready, route the CTA to the best live channel until the provider link exists.
