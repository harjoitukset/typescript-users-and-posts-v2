# Users & Posts v2: Filter, Map & Sort

Tässä tehtävässä jatketaan TypeScriptin parissa ja perehdytään taulukkofunktioihin sekä lajittelualgoritmeihin. Tehtävä on jatkoa [Users & Posts](https://github.com/harjoitukset/typescript-users-and-posts) -tehtävälle.

Tehtävän ensimmäisessä osassa perehdyttiin TypeScript-kieleen ja ratkaisun teknisen toteutuksen osalta tyyli oli vapaa. Tällä kertaa tavoitteenamme on opetella tiettyjä ennalta valittuja algoritmeja sekä tietorakenteita.

## GitHub classroom

Tehtävä arvostellaan käyttäen [GitHub classroom](https://classroom.github.com/) -palvelua, joka suorittaa ohjelmasi ja tarkastaa sekä pisteyttää tulokset automaattisesti. Voit tarvittaessa lähettää tehtävän tarkastettavaksi monta kertaa. Tee tällöin uusi commit ja vie (push) muutokset GitHubiin. Varmista kuitenkin, että viimeisin tekemäsi commit tuottaa parhaat pisteet.

Tehtävät tarkastetaan automaattisesti Jest-yksikkötesteillä. Testeihin perehtyminen ei ole tehtävän suorittamiseksi välttämätöntä, mutta testit voivat auttaa hahmottamaan miten oman koodisi tulee toimia. Saat kirjoittaa halutessasi lisää testejä, mutta älä muuta tai poista valmiiksi kirjoitettuja testejä.

Kun olet hyväksynyt tehtävän GitHub classroomissa ja saanut repositoriosta henkilökohtaisen kopion, kloonaa se itsellesi `git clone` -komennolla. **Varmista, että Git-osoitteen lopussa on oma GitHub-käyttäjänimesi**. Jos käyttäjänimesi puuttuu osoitteesta, kyseessä ei ole henkilökohtainen kopiosi tehtävästä. Luo tässä tapauksessa oma classroom-kopio tehtävästä itsellesi Teams-tehtävästä löytyvän linkin avulla.


## Riippuvuuksien asentaminen

Aloita asentamalla projektin riippuvuudet, jotka on määritelty `package.json`-tiedostossa:

```sh
$ npm install
```

Riippuvuudet sisältävät sekä [TypeScript-kielen](https://www.npmjs.com/package/typescript), [Jest-testaustyökalun](https://www.npmjs.com/package/jest) että [`ts-node`](https://www.npmjs.com/package/ts-node)- ja [`ts-jest`](https://www.npmjs.com/package/ts-jest)-paketit TypeScript-kielisen koodin ja testien suorittamiseksi Node.js:llä. Node.js sinulta tulee löytyä valmiina.


## Pääohjelman suorittaminen

Tehtäväpohjassa on valmiiksi toteutettu pääohjelma [/src/usersAndPosts.ts](./src/usersAndPosts.ts), joka tulostaa käyttäjiä ja postauksia. Tulosteet ovat alussa väärät, mutta ne muuttuvat oikeiksi yksitellen ratkoessasi tehtäviä.

```sh
$ npm start                         # tapa 1
$ npx ts-node src/usersAndPosts.ts  # tapa 2
```

Ohjelman tuloste on muodoltaan esim. seuraava:

```
# Terry Medhurst (2022-07-16T22:57:59.361Z)
 - This is important to remember.
   2023-07-11T05:33:06.104Z 2023-07-21T23:53:01.586Z
 - One can cook on and with an open fire.
   2023-06-30T05:30:54.612Z 2023-07-13T14:36:48.159Z

# Sheldon Quigley (1638589047)
 - His mother had always taught him
   2023-07-13T09:33:37.100Z
 - There are different types of secrets.
   2023-09-01T10:02:19.997Z
```

Edellisestä tehtävästä poiketen käyttäjille on tallennettuna rekisteröitymisaika (suluissa nimen jälkeen). Postauksille on myös merkitty luontiaika, minkä lisäksi osalla postauksista on myös poistamisaika.

Ohjelman kehitys on ottanut uusien ominaisuuksien vuoksi melkoisia harppauksia. Lisäksi vaatimukset koodin yksikkötestauksen sekä uudelleenkäytettävyyden osalta ovat selkeytyneet, joten se on pilkottu useiksi erillisiksi funktioiksi ja tiedostoiksi. Sinun tehtäväsi on jatkaa kehitystyötä tuoteomistajan vaatimusten mukaisesti.

💡 *Sinun ei tarvitse muuttaa `usersAndPosts.ts`-tiedostoa ratkaistessasi tätä tehtävää. Tiedoston muuttaminen esim. ohjelman toiminnan tutkimiseksi on kuitenkin halutessasi sallittua.*


## Tehtävän data

Tehtävässä hyödynnetään staattista JSON-muotoista dataa [dummyjson.com](https://dummyjson.com)-palvelusta. Tehtäväpohjan tiedostot [users.json](./data/1users.json) sekä [posts.json](./data/posts.json) on ladattu suoraan tehtäväpohjaan DummyJSON-projektin [GitHub-repositoriosta](https://github.com/Ovi/DummyJSON/blob/master/src/data/).

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
+  "publishedAt": "2023-06-01T08:07:20.410Z",
+  "deletedAt": "2023-06-14T02:16:08.513Z"
 }
```

`User`-tietotyyppiin on lisäksi lisätty `registeredAt`-tieto.

```diff
 {
   "id": 1,
   "firstName": "Terry",
   "lastName": "Medhurst",
   "maidenName": "Smitham",
   "age": 50,
   "gender": "male",
   "userAgent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24",
+  "registeredAt": "2022-07-16T22:57:59.361Z"
 }
```

Näitä tietotyyppejä vastaavat TypeScript-tyypit löytyvät valmiina tiedostosta [src/types.ts](./src/types.ts). Tarkemmat tiedot uusista tiedoista selviävät alempaa.


## Tehtävä

Tuoteomistaja Maxwell Goldgrabber on kirjoittanut sinulle oheisen fiktiivisen saateviestin. Jos et jaksa lukea tarinaa, voit hypätä viestin yli suoraan tehtävän osiin.

> Subject: RE: RE: RE: RE: Users and posts
>
> Dear developer,
>
> I hope this message finds you well. We have some critical tasks ahead that require your immediate attention. These tasks are not only essential for our product's success but also for my quarterly bonus, which is directly tied to their successful completion.
>
> * Task 1: *filterOutDeletedPosts*
>
>   The first task is to implement the *filterOutDeletedPosts* function. We've received complaints from our customers about deleted posts appearing in the listings. It's absolutely crucial that posts with a *deletedAt* timestamp are filtered out without fail.
>
> * Task 2: *mapPostsToUsers*
>
>   The second task involves creating a *mapPostsToUsers* function. The previous implementation relied heavily on nested logic and *console.log* statements, making it incredibly challenging for our testers to conduct unit tests and for other teams to use the code.
>
>   This function will be instrumental in associating posts with users, allowing us to provide a more comprehensive user experience. Each *UserWithPosts* object should contain the user's posts.
>
> * Task 3: *sortPostsByPublishedDate*
>
>   Task three is to implement a *sortPostsByPublishedDate* function. We need this function to sort posts by *publishedAt* date using a clean and maintainable approach.
>
> * Task 4: *sortUsersByRegistrationDate*
>
>   Finally, we need to implement a *sortUsersByRegistrationDate* function. This function should sort users by their *registeredAt* date, accommodating different data types (integer and string) for this attribute. Storing strings and intergers in the same field is a small piece of technical debt that we need to deal with later.
>
> The urgency of these tasks cannot be overstated. The previous versions relied too heavily on nested logic and *console.log* statements, making it exceptionally difficult for our testers to conduct unit tests and for the mobile and web teams to reuse the code.
>
> On a lighter note, I wanted to share some exciting news. I've already made a pre-order on a Tesla, and my bonus from this quarter is playing a significant role in making that dream a reality. So, you can understand the importance of these tasks!
>
> Your job and my quarterly bonus are at stake if we don't address these issues promptly and effectively. I have complete confidence in your abilities, and I know you can rise to this challenge. Please prioritize these tasks and reach out if you need any guidance or assistance along the way.
>
> Thank you for your dedication to our project, and I look forward to seeing these improvements implemented.
>
> Best regards,
>
> Maxwell Goldgrabber<br/>
> Product Manager<br/>
> Lampaala Group<br/>
> This email was sent from and written by ChatGPT

## Osa 1: `filterOutDeletedPosts` (10 % pisteistä)

Toteuta funktio `filterOutDeletedPosts`, jonka pohja löytyy tiedostosta [/src/filtering.ts](./src/filtering.ts). Funktion tulee hyödyntää `filter`-metodia ja palauttaa uusi taulukko, josta puuttuu kaikki sellaiset Post-objektit, joilla on asetettuna `deletedAt`-arvo.

Katso lisää [filter-metodin ohjeista](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)-palvelussa.

Ratkaisullesi on kirjoitettu valmiit testit, jotka voit ajaa seuraavalla komennolla:

```sh
$ npm test src/tests/filtering.test.ts
```

## Osa 2: `mapPostsToUsers` (20 % pisteistä)

Katso lisää [map-metodin ohjeista](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)-palvelussa.

Ratkaisullesi on kirjoitettu valmiit testit, jotka voit ajaa seuraavalla komennolla:

```sh
$ npm test src/tests/mapping.test.ts
```

## Osa 3: `sortPostsByPublishedDate` (40 % pisteistä)

Ratkaisullesi on kirjoitettu valmiit testit, jotka voit ajaa seuraavalla komennolla:

```sh
$ npm test src/tests/sorting-posts.test.ts
```

## Osa 4: `sortUsersByRegistrationDate` (30 % pisteistä)

Ratkaisullesi on kirjoitettu valmiit testit, jotka voit ajaa seuraavalla komennolla:

```sh
$ npm test src/tests/sorting-users.test.ts
```

## Lisenssit ja tekijänoikeudet

Tämän tehtävän on kehittänyt Teemu Havulinna ja se on lisensoitu [Creative Commons BY-NC-SA -lisenssillä](https://creativecommons.org/licenses/by-nc-sa/4.0/).


## DummyJSON

Tehtävässä hyödynnetyn [DummyJSON](https://github.com/Ovi/DummyJSON/)-palvelun on kehittänyt [Muhammad Ovi (Owais)](https://github.com/Ovi/) ja se on lisensoitu MIT-lisenssillä: [https://github.com/Ovi/DummyJSON/blob/master/LICENCE](https://github.com/Ovi/DummyJSON/blob/master/LICENCE).
