# Users & Posts v2: Filter, Map & Sort

Tässä tehtävässä jatketaan TypeScriptin parissa ja perehdytään [taulukkofunktioihin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) sekä lajittelualgoritmeihin. Tehtävä on jatkoa Users & Posts -tehtävälle, mutta sen ratkaiseminen ei edellytä esitietoja edellisestä tehtävästä.

Tehtävän ensimmäisessä osassa perehdyttiin TypeScript-kieleen ja ratkaisun tyyli oli vapaa. Tällä kertaa tavoitteenamme on opetella tiettyjä ennalta valittuja algoritmeja sekä tietorakenteita. Samalla teemme koodista testattavaa ja uudelleenkäytettävää.

Koska tehtävän tavoitteena on rakentaa uudelleenkäytettävä ratkaisu, voit ratkaista tätä tehtävää halutessasi joko komentorivikäyttöliittymän tai valmiiksi toteutetun REST-rajapinnan parissa.

> [!TIP]
> Hyödynnämme tässä tehtävässä suosittuja [Vitest](https://vitest.dev/)- ja [Express](https://expressjs.com/)-työkaluja. Sinun ei kuitenkaan tarvitse tehdä muutoksia Vitest- eikä Express-koodiin.


## Kehitysympäristön asennus

Tehtävän suorittamiseksi tarvitset [Node.js-suoritusympäristön](https://nodejs.org/) sekä npm-pakettienhallintasovelluksen, joka tulee tyypillisesti Node.js-asennuksissa mukana. Suosittelemme käyttämään tehtävissä [uusinta LTS-versiota (Long Term Support)](https://github.com/nodejs/release#release-schedule).

> [!TIP]
> Suosittelemme ratkaisemaan tämän tehtävän [kehityskontissa](https://code.visualstudio.com/docs/devcontainers/containers) tai [CodeSpacessa](https://github.com/features/codespaces), joka tarjoaa valmiiksi määritetyn ympäristön, jossa Node.js ja npm ovat asennettuina.
>
> Kehityskontti eristää projektin muusta käyttöjärjestelmästä, joten sillä voi olla myös positiivisia tietoturvavaikutuksia.


**Riippuvuuksien asentaminen**

Kehitysympäristön valmistelun jälkeen jatka asentamalla projektin riippuvuudet, jotka on määritelty [`package.json`-tiedostossa](./package.json):

```sh
npm install
```

Riippuvuudet sisältävät:

* [TypeScript-kielen](https://www.typescriptlang.org/) [(npm)](https://www.npmjs.com/package/typescript)
* [Vitest-testaustyökalun](https://vitest.dev/) [(npm)](https://www.npmjs.com/package/vitest)
* [Express](https://expressjs.com/) [(npm)](https://www.npmjs.com/package/express)-web-sovelluskehyksen
* [Supertest](https://github.com/ladjs/supertest) [(npm)](https://www.npmjs.com/package/supertest)-paketin Express-sovelluksen testaamiseksi

Löydät lisätietoja ja esimerkkejä näiden työkalujen käytöstä niiden omilta verkkosivuilta yllä olevien linkkien kautta.

Lisäksi riippuvuudet sisältävät TypeScript-tyyppimäärittelyt [Node.js:lle](https://www.npmjs.com/package/@types/node), [Expressille](https://www.npmjs.com/package/@types/express) ja [Supertestille](https://www.npmjs.com/package/@types/supertest).

Projektiin valitut riippuvuudet ovat alalla laajalti käytettyjä. Niillä on kirjoitushetkellä kymmeniä miljoonia [viikoittaisia latauksia npm-pakettirekisterissä](https://www.npmjs.com/).


## Pääohjelman suorittaminen

Tehtäväpohjassa on valmiiksi toteutettu pääohjelma [/src/usersAndPosts.ts](./src/usersAndPosts.ts), joka tulostaa käyttäjiä ja postauksia. **Tulosteet ovat alussa väärät ja esimerkiksi käyttäjien nimien jälkeen tulostuu aina samat otsikot.** Tulosteet muuttuvat kuitenkin oikeiksi sitä mukaa, kun ratkot tehtävän osia.

```sh
# vaihtoehto 1: käännä koodi JS:ksi ja suorita:
npm run build
node build/usersAndPosts.js

# vaihtoehto 2: suorita TS-koodi suoraan nodella:
node src/usersAndPosts.ts
```

Vaihtoehto 1 on varmempi, koska siinä koodi käännetään ensin TypeScriptistä JavaScriptiksi, minkä jälkeen se suoritetaan Node.js:llä. Se kuitenkin edellyttää `npm run build`-komennon suorittamista aina, kun lähdekoodiin on tehty muutoksia. Vaihtoehto 2 on nopeampi, sillä siinä koodia ei käännetä, mutta se voi johtaa ongelmiin, jos TypeScript-koodissa on syntaksivirheitä. TypeScript-koodin suorittaminen suoraan Nodella saattaa toimia myös eri tavoilla riippuen Node.js:n versiosta ja sen asetuksista, minkä vuoksi suosittelemme käyttämään vaihtoehtoa 1.

Ohjelman tuloste on muodoltaan esim. seuraava:

```
# Emma Johnson, registered: 2026-07-16T22:57:59.361Z

- Running TypeScript with Node.js
  Published: 2027-06-30T05:30:54.612Z
- Running TypeScript in the browser
  Published: 2025-07-11T05:33:06.104Z
  Deleted: 2027-07-21T23:53:01.586Z

# Olivia Smith, registered: 1764733047

- Understanding JavaScript closures
  Published: 2027-09-01T10:02:19.997Z
- How to exit vim
  Published: 2027-07-13T09:33:37.100Z
```

Edellisestä tehtävästä poiketen käyttäjille on tallennettuna rekisteröitymisaika nimen jälkeen. Postauksille on myös lisätty luontiaika, minkä lisäksi osalla postauksista on myös poistamisaika. Nämä ajat tulostuvat otsikon alapuolelle:

```
- Running TypeScript in the browser
  Published: 2025-07-11T05:33:06.104Z
  Deleted: 2027-07-21T23:53:01.586Z
```

> [!NOTE]
> Sinun ei tarvitse muuttaa `usersAndPosts.ts`-tiedostoa ratkaistessasi tätä tehtävää. Tiedoston muuttaminen esim. ohjelman toiminnan tutkimiseksi on kuitenkin halutessasi sallittua.
>
> Toisin kuin edellisessä tehtävässä, tämän tehtävän automaattinen arviointi perustuu pääohjelman sijasta yksittäisten funktioiden testaamiseen yksikkötestien avulla.


### Testit (Vitest) ja REST-rajapinta (Express)

Ohjelman kehitys on ottanut edellisen tehtävän jälkeen melkoisia harppauksia. Lisäksi vaatimukset **koodin yksikkötestauksen** sekä **uudelleenkäytettävyyden** osalta ovat lisääntyneet, joten ohjelma on pilkottu useisiin erillisiin funktioihin ja tiedostoihin.

Sinun tehtäväsi on jatkaa kehitystyötä fiktiivisen tuoteomistajan vaatimusten mukaisesti. Tehtävän edetessä sinun tulee suorittaa testejä, jotka on kirjoitettu [Vitest-työkalulla](https://vitest.dev/):

```
npm test
```

Ohjelmassa on komentorivikäyttöliittymän lisäksi myös uusi REST-rajapinta, jota voit halutessasi käyttää ratkaisusi kokeilemisessa. Rajapinta on toteutettu [Express-kirjastolla](https://expressjs.com/) ja siihen liittyvät tiedostot löytyvät [/src/server/](./src/server/)-hakemistosta. Voit käynnistää palvelimen komennolla:

```sh
# vaihtoehto 1: käännä koodi ja suorita:
npm run build
npm run server

# vaihtoehto 2: suorita koodi suoraan nodella:
node src/server/index.ts
```

Yksittäisen käyttäjän omat tiedot, sekä käyttäjään liittyvät postaukset, pitäisi löytyä käyttäjän id:n avulla esimerkiksi osoitteella [http://127.0.0.1:3000/api/v1/user/1](http://127.0.0.1:3000/api/v1/user/1). Kaikkien käyttäjien tiedot ja käyttäjäkohtaiset postaukset puolestaan pitäisi saada osoitteesta [http://127.0.0.1:3000/api/v1/user](http://127.0.0.1:3000/api/v1/user).

```
curl http://localhost:3000/api/v1/user
curl http://localhost:3000/api/v1/user/1
```

Huomaa, että lähdekoodiin tekemäsi muutokset eivät näy REST-rajapinnassa ennen kuin olet kääntänyt koodin ja käynnistänyt palvelimen uudelleen.

[/src/server/](./src/server/)-hakemiston tiedostot on pyritty kommentoimaan siten, että pärjäät niiden kanssa itsenäisesti.


## Tehtävän data

Tehtävässä hyödynnetään edellisestä tehtävästä tuttua JSON-muotoista dataa [dummyjson.com](https://dummyjson.com)-palvelusta. Tehtäväpohjan tiedostot [users.json](./data/users.json) sekä [posts.json](./data/posts.json) on ladattu tähän git-repositorioon DummyJSON-projektin [GitHub-repositoriosta](https://github.com/Ovi/DummyJSON/blob/master/src/data/).

Tehtävän edelliseen versioon nähden `Post`-tietotyyppiin on tullut uudet attribuutit `publishedAt` sekä `deletedAt`:

```diff
 {
   "id": 5,
   "title": "Hopes and dreams were dashed that day.",
   "body": "Hopes and dreams were...",
   "userId": 41,
   "tags": [
     "crime",
     "mystery",
     "love"
   ],
   "reactions": 2,
+  "publishedAt": "2027-06-01T08:07:20.410Z",
+  "deletedAt": "2027-06-14T02:16:08.513Z"
 }
```

`User`-tietotyyppiin on lisäksi lisätty `registeredAt`-tieto:

```diff
 {
   "id": 1,
   "firstName": "Terry",
   "lastName": "Medhurst",
   "maidenName": "Smitham",
   "age": 50,
   "gender": "male",
   "userAgent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24",
+  "registeredAt": "2026-07-16T22:57:59.361Z"
 }
```

Näitä tietotyyppejä vastaavat TypeScript-tyypit löytyvät valmiina tiedostosta [src/types.ts](./src/types.ts). Tarkemmat tiedot uusista tiedoista selviävät alempaa. Jos aihe kiinnostaa, löydät tiedostojen muokkauksessa käytetyt skriptit [src/scripts/](./src/scripts/)-hakemistosta.


## Tehtävä

Tuoteomistaja Maxwell Goldgrabber on kirjoittanut sinulle oheisen fiktiivisen saateviestin.

[TL;DR](https://en.wikipedia.org/wiki/TL;DR): Jos et jaksa lukea tarinaa, voit hypätä viestin yli suoraan tehtävän osiin.

> Subject: RE: RE: RE: RE: Users and posts
>
> Dear developer,
>
> I hope this message finds you well. We have some critical tasks ahead that require your immediate attention. These tasks are not only essential for our product's success but also for my quarterly bonus, which is directly tied to their successful completion.
>
> * Task 1: *excludeDeletedPosts*
>
>   Your first task is to implement a [*excludeDeletedPosts* function](./src/filtering.ts). We've received complaints from our customers about deleted posts appearing in the listings. It's absolutely crucial that posts with a *deletedAt* timestamp are filtered out without fail.
>
> * Task 2: *mapPostsToUsers*
>
>   The second task involves creating a [*mapPostsToUsers* function](./src/mapping.ts). The previous implementation relied heavily on nested logic and *console.log* statements, making it incredibly challenging for our testers to conduct unit tests and for other teams to reuse the code.
>
>   This function will be instrumental in associating posts with users both on the command line and in our brand new REST api.
>
> * Task 3: *sortPostsByPublishedDate*
>
>   Task three is to implement a [*sortPostsByPublishedDate* function](./src/sorting.ts). We need this function to sort posts by *publishedAt* by implementing [a sorting algorithm](https://en.wikipedia.org/wiki/Sorting_algorithm) ourselves.
>
> * Task 4: *sortUsersByRegistrationDate*
>
>   Finally, we need to implement a [*sortUsersByRegistrationDate* function](./src/sorting.ts). This function should sort users by their *registeredAt* date, accommodating different data types (integer and string) for this attribute. Storing strings and intergers in the same field is a small piece of [technical debt](https://en.wikipedia.org/wiki/Technical_debt) that we just need to live with for now.
>
>
> The urgency of these tasks cannot be overstated. The previous versions relied too heavily on nested logic and *console.log* statements, making it exceptionally difficult for our testers to conduct unit tests and for the mobile and web teams to reuse the code in the REST api.
>
> On a lighter note, I wanted to share some exciting news. I've already made a pre-order on a new Tesla 🏎️, and my bonus from this quarter is playing a significant role in making that dream a reality💰. So, you can understand the importance of these tasks!!!!1!!
>
> Your job and my quarterly bonus are at stake if we don't address these issues promptly and effectively. I have complete confidence in your abilities, and I know you can rise to this challenge. Please prioritize these tasks and reach out if you need any guidance or assistance along the way.
>
> Thank you for your dedication to our project, and I look forward to seeing these improvements implemented.
>
> Best regards,
>
> Maxwell Goldgrabber<br/>
> Product Manager<br/>
> ContentMonger Inc.<br/>
> This email was written with help from ChatGPT


## Osa 1: suodattaminen eli filtering (10 % + 10 %)

Toteuta funktio `excludeDeletedPosts`, jonka pohja löytyy tiedostosta [/src/filtering.ts](./src/filtering.ts). Funktion tulee hyödyntää annetun taulukon `filter`-metodia ja palauttaa uusi taulukko, josta puuttuu kaikki sellaiset [Post-objektit](./src/types.ts), joilla on asetettuna jokin `deletedAt`-arvo.

Lue lisää filter-metodista [MDN Web Docs -palvelussa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

Ratkaisullesi on kirjoitettu [valmiit testit](./src/tests/filtering-active.test.ts), jotka voit suorittaa seuraavilla komennoilla:

```
npm test src/tests/filtering-active.test.ts

✓ filtering active posts (4)
  ✓ active posts are included in the result
  ✓ posts marked as deleted are excluded from the result
  ✓ deleted posts are removed from the beginning, end and between active articles
  ✓ the function does not modify the original array
```

Vaihtoehtoisesti voit myös suorittaa komentorivikäyttöliittymän ja tarkastaa manuaalisesti, ettei listauksessa millään postauksella ole luontiajan lisäksi poistoaikaa. Kolmas vaihtoehto on käyttää REST-rajapintaa (`npm run server` ja `http://localhost:3000/api/v1/user`) ja varmistaa, että tuloksessa ei ole sellaisia postauksia, joilla on `deletedAt`-arvo.

Toteuta lisäksi samaan tiedostoon funktio `selectPostsByUser`, joka palauttaa uuden taulukon, joka sisältää vain annetun käyttäjän omat postaukset. Tämäkään funktio ei saa muokata alkuperäistä taulukkoa.

```
npm test src/tests/filtering-by-user.test.ts

✓ filtering by user (2)
  ✓ posts belonging to the given user are included in the result
  ✓ the function does not modify the original array
```


## Osa 2: `mapPostsToUsers` (20 % pisteistä)

Tiedostossa [src/mapping.ts](./src/mapping.ts) on pohja funktiolle, joka ottaa parametreinaan taulukot `User`- sekä `Post`-objekteista. Tehtävänäsi on jatkokehittää tätä funktiota siten, että se lisää käyttäjille taulukon hänen omista `Post`-objekteistaan.

Tuloksena funktion tulee palauttaa uusi `UserWithPosts`-taulukko. `UserWithPosts`-tyyppi on määritetty [src/types.ts](./src/types.ts)-tiedostossa ja se sisältää käytännössä `User`-objektin lisäksi uuden `posts`-attribuutin, joka on taulukko käyttäjän omista postauksista.

Lue lisää map-metodista [MDN Web Docs -palvelussa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

Ratkaisullesi on kirjoitettu [valmiit testit](./src/tests/mapping.test.ts), jotka voit suorittaa seuraavalla komennolla:

```
npm test src/tests/mapping.test.ts


✓ mapUsersWithPosts (3)
  ✓ posts are mapped with users correctly
  ✓ function does not modify given users
  ✓ empty input arrays are handled without errors
```

Edellisessä osassa esitellyt vaihtoehdot komentirivikäyttöliittymän ja REST-rajapinnan käytöstä manuaaliseen testaukseen soveltuvat myös tähän ja seuraaviin osiin.


## Osa 3: `sortPostsByPublishedDate` (30 % pisteistä)

Tehtävän kolmannessa osassa sinun tulee **järjestää** eli **lajitella** kirjoitukset (`Post`) niiden julkaisuajan mukaan käyttäen **itse toteuttamaasi lajittelualgoritmia**.

Tiedostossa [src/sorting.ts](./src/sorting.ts) on määriteltynä seuraava funktio:

```ts
export function sortPostsByPublishedDate(posts: Post[]): Post[] {
}
```

Toteuta lajittelulogiikkasi tähän funktioon siten, että funktio palauttaa uuden taulukon, joka on lajiteltu Post-objektien julkaisuajan mukaan kasvavassa järjestyksessä. Voit halutessasi toteuttaa myös erillisiä apufunktioita.

Huomaa, että koodisi tulee lajitella **kokonaisia Post-objekteja**, eli et voi poimia aineistosta esimerkiksi pelkkiä otsikoita ja julkaisuaikoja. Et saa myöskään muuttaa annettuja taulukkoa tai sillä olevia objekteja.

Ratkaisullesi on kirjoitettu [valmiit testit](./src/tests/sorting-posts.test.ts), jotka voit suorittaa seuraavalla komennolla:

```
npm test src/tests/sorting-posts.test.ts


✓ sorting posts by publishedAt (5)
  ✓ post are returned in correct order
  ✓ sorting handles posts with identical dates correctly
  ✓ sorting an empty array should not throw exceptions
  ✓ sorting should not modify the original array
  ✓ sorting posts must not utilize Array.sort
```

> [!IMPORTANT]
> 🚨 Tämän harjoituksen tavoitteena on opetella itse toteuttamaan jokin tunnettu lajittelualgoritmi, joten JavaScriptin valmiin `Array.sort`-funktion käyttämistä ei sallita.


### Yleisimmät lajittelualgoritmit

Voit valita toteutettavan lajittelualgoritmin esimerkiksi seuraavista:

**Lisäyslajittelu eli Insertion Sort**

[https://en.wikipedia.org/wiki/Insertion_sort](https://en.wikipedia.org/wiki/Insertion_sort)

<a title="Simpsons contributor / CC BY-SA (https://creativecommons.org/licenses/by-sa/3.0)" href="https://commons.wikimedia.org/wiki/File:Insertion_sort.gif"><img height="150" alt="Insertion sort" src="https://upload.wikimedia.org/wikipedia/commons/4/42/Insertion_sort.gif"></a>

*Kuva: By Simpsons contributor - Own work, CC BY-SA 3.0, [https://commons.wikimedia.org/w/index.php?curid=17512147](https://commons.wikimedia.org/w/index.php?curid=17512147)*

**Lomituslajittelu eli Merge Sort**

[https://en.wikipedia.org/wiki/Merge_sort](https://en.wikipedia.org/wiki/Merge_sort)

<a title="Swfung8 / CC BY-SA (https://creativecommons.org/licenses/by-sa/3.0)" href="https://commons.wikimedia.org/wiki/File:Merge-sort-example-300px.gif"><img width="150" alt="Merge-sort-example-300px" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif" style="border solid silver 1px;"></a>

*Kuva: By Swfung8 - Own work, CC BY-SA 3.0, [https://commons.wikimedia.org/w/index.php?curid=14961648](https://commons.wikimedia.org/w/index.php?curid=14961648)*

**Kuplalajittelu eli Bubble Sort**

[https://en.wikipedia.org/wiki/Bubble_sort](https://en.wikipedia.org/wiki/Bubble_sort)

<a href="https://commons.wikimedia.org/wiki/File:Bubble-sort-example-300px.gif#/media/File:Bubble-sort-example-300px.gif" title="By Swfung8 - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=14953478"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif" alt="Bubble-sort-example-300px.gif" width="150" style="border solid silver 1px;"></a>

*Kuva: By Swfung8 - Own work, CC BY-SA 3.0, [https://commons.wikimedia.org/w/index.php?curid=14953478](https://commons.wikimedia.org/w/index.php?curid=14953478)*

**Pikalajittelu eli Quicksort**

[https://en.wikipedia.org/wiki/Quicksort](https://en.wikipedia.org/wiki/Quicksort)

<a href="https://commons.wikimedia.org/wiki/File:Sorting_quicksort_anim.gif#/media/File:Sorting_quicksort_anim.gif" title="By en:User:RolandH, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=1965827"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif" alt="Sorting quicksort anim.gif" width="150" style="border solid silver 1px;"></a>

*Kuva: By en:User:RolandH, CC BY-SA 3.0, [https://commons.wikimedia.org/w/index.php?curid=1965827](https://commons.wikimedia.org/w/index.php?curid=1965827)*


### Algoritmin valintaperusteet

Voit valita itsellesi mieluisen algoritmin esimerkiksi tutustumalla ensin niiden tehokkuuteen. Voit myös hyvin valita sen, joka vaikuttaa toteutukseltaan sopivan yksinkertaiselta. Muista myös, että voit kysyä kurssin keskustelukanavilla neuvoa mihin vain tehtävässä kohtaamaasi haasteeseen liittyen. Todennäköisesti samojen haasteiden parissa kamppailee myös moni muu kurssilainen.

**Huom!** Oikeassa ohjelmistoprojektissa käyttäisit JavaScriptin `Array.sort`-funktiota ja antaisit sille parametrina kahta julkaisuaikaa vertailevan funktion. Voit tutustua aiheeseen esim. [MDN Web Docs -sivustolla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). Tässä tehtävässä harjoittelemme algoritmin toteutusta, joten kirjoitamme lajittelun itse.


## Osa 4: `sortUsersByRegistrationDate` (30 % pisteistä)

Tehtävän viimeinen osa on toinen lajittelu, jossa lajiteltavan aineiston vaihtelevat tietotyypit edellyttävät hieman soveltamista:

> Subject: RE: RE: RE: RE: RE: RE: Users and posts
>
> As part of our ongoing improvements to our platform, we've encountered a unique challenge with the `registeredAt` attribute in our user records. The `registeredAt` attribute stores the registration date for each user. However, we've noticed that different users have different data types for this attribute.
>
> **Users who registered through our mobile app have [an integer value representing the epoch timestamp (in seconds)](https://en.wikipedia.org/wiki/Unix_time), while users who registered through the web app have [a date string in ISO format](https://en.wikipedia.org/wiki/ISO_8601)**.
>
> It's crucial that we sort all users in ascending order by their registration date, regardless of the data type inconsistency. This is the type of [technical debt](https://en.wikipedia.org/wiki/Technical_debt) that we appear to have 🤷.
>
> In this case, you are allowed to utilize the pre-existing [`Array.sort` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). However, I encourage you to reuse the sorting logic that you previously used when sorting posts.
>
> Thank you for your dedication to our project, and I look forward to seeing your solution in action.
>
> Maxwell Goldgrabber<br/>
> This email was written by ChatGPT
>
> P.S. Here are examples of the different types of `registeredAt` values for users, that can be found in the [users.json](./data/users.json):
>
> 1. **Epoch Timestamp (Integer)**:
>    - User id 2: Registered at 1764819447 (Thu Dec 04 2025 03:37:27 GMT+0000)
>    - User id 3: Registered at 1759039598 (Sun Sep 28 2025 06:06:38 GMT+0000)
>
> 2. **ISO Format (String)**:
>    - User id 1: Registered at "2026-07-16T22:57:59.361Z" (Thu Jul 16 2026 22:57:59 GMT+0000)
>    - User id 4: Registered at "2025-10-12T04:57:33.720Z" (Sun Oct 12 2025 04:57:33 GMT+0000)
>
> These examples demonstrate the variation in the `registeredAt` attribute's data types, with some users having integer values (epoch timestamps) and others having string values (in ISO 8601 format). It's essential that your implementation handles the different data types (integer and string) for the *registeredAt* attribute **without modifying the user records**.


Käyttäjiä vertaillessasi siis sinun tulee siis huomioida, että niiden **rekisteröitymisaika saattaa olla tallennettuna kahdella eri tavalla**. Tässä voi olla hyödyksi toteuttaa erillinen apufunktio, joka palauttaa käyttäjästä riippumatta rekisteröitymisajan aina samassa muodossa.

Lisäksi saatat hyötyä [`typeof`-operaattorista](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof), [Date-luokasta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) tai mahdollisesti [StackOverflow-keskusteluista](https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date). Tässä osassa saat käyttää [JavaScriptin valmista sort-metodia](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

Ratkaisullesi on kirjoitettu [valmiit testit](./src/tests/sorting-users.test.ts), jotka voit ajaa seuraavalla komennolla:

```
npm test src/tests/sorting-users.test.ts


✓ sorting users by registration date (7)
  ✓ users with Unix timestamps are sorted in correct order 2ms
  ✓ users with ISO dates are sorted in correct order 0ms
  ✓ users with both numeric and string dates are sorted in correct order 0ms
  ✓ sorting handles posts with identical dates without errors 0ms
  ✓ sorting an empty array must not throw exceptions 0ms
  ✓ sorting must not modify the users 0ms
  ✓ sorting must not modify the original array 0ms
```


## Tehtävän arviointi

Tehtävä arvostellaan käyttäen GitHub actions -palvelua, joka suorittaa ohjelmasi ja tarkastaa sekä pisteyttää tulokset automaattisesti. Voit tarvittaessa lähettää tehtävän tarkastettavaksi monta kertaa. Tee tällöin uusi commit ja vie (push) muutokset GitHubiin. Varmista kuitenkin, että viimeisin tekemäsi commit tuottaa parhaat pisteet.

Tehtävät tarkastetaan automaattisesti edellisissä osissa esitellyillä [Vitest-yksikkötesteillä](./src/tests/). Testeihin perehtyminen ei ole tehtävän suorittamiseksi välttämätöntä, mutta testit voivat auttaa hahmottamaan miten oman koodisi tulee toimia.

Voit suorittaa kaikki testit kerralla komennolla:

```
npm test
```

> [!TIP]
> Saat kirjoittaa halutessasi lisää testejä, mutta älä muuta tai poista valmiiksi kirjoitettuja testejä.
>
> Testien toimivuuden varmistamiseksi tehtävänannossa määritettyjen funktioiden nimien, parametrien tai paluuarvojen muuttaminen ei ole sallittua.


## Lisenssit ja tekijänoikeudet

### Node.js

> "Node.js is available under the [MIT license](https://opensource.org/licenses/MIT). Node.js also includes external libraries that are available under a variety of licenses. See [LICENSE](https://github.com/nodejs/node/blob/HEAD/LICENSE) for the full license text."
>
> https://github.com/nodejs/node#license

### TypeScript

TypeScript itsessään on lisensoitu Apache-2.0 -lisenssillä: https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt

### Vitest

Vitest-työkalu on lisensoitu MIT-lisenssillä: https://github.com/vitest-dev/vitest/blob/main/LICENSE

### Express

Express is licensed under the MIT license. See [LICENSE](https://github.com/expressjs/express/blob/master/LICENSE) for the full license text.

### Supertest

Supertest is licensed under the MIT license. See [LICENSE](https://github.com/ladjs/supertest/blob/master/LICENSE) for the full license text.

### DummyJSON

Tehtävässä hyödynnetyn [DummyJSON](https://github.com/Ovi/DummyJSON/)-palvelun on kehittänyt [Muhammad Ovi (Owais)](https://github.com/Ovi/) ja se on lisensoitu MIT-lisenssillä: [https://github.com/Ovi/DummyJSON/blob/master/LICENSE](https://github.com/Ovi/DummyJSON/blob/master/LICENSE).

### Tämä tehtävä

Tämän tehtävän on kehittänyt Teemu Havulinna ja se on lisensoitu [Creative Commons BY-NC-SA -lisenssillä](https://creativecommons.org/licenses/by-nc-sa/4.0/). Tehtävänannon, lähdekoodien ja testien toteutuksessa on hyödynnetty ChatGPT- sekä GitHub copilot -tekoälytyökaluja.
