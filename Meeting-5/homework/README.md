# Homeworks

დაბლა მოცემულია ამ შეხვედრის დავალებასთან დაკავშირებით დეტალური ინფორმაცია.

ყველა შესასრულებელი დავალებისთვის გამოიყენეთ შემდეგი საწყისი კოდი (starter pack):

```js
console.log("Start");

const usersDB = {
  "user1@hw.js": [{ title: "video1" }, { title: "video2" }],
  "user2@hw.js": [{ genre: "genre1" }, { genre: "genre1" }],
  "user3@hw.js": [],
};

// your code goes here...

console.log("Finish");
```

## Homework-1 (Using Callbacks)

### მომზადების ნაწილი

#### loginUser() function

1. შევქმნათ ფუნქცია სახელად `loginUser()`, რომელიც მიიღებს სამ არგუმენტს.

   ```js
   function loginUser(email, password, callback) {
     // your code goes here...
   }
   ```
2. ამ ფუნქციამ 3 წამის შემდეგ უნდა დალოგოს კონსოლში ტექსტი `Now we have the data of user:` და ორი წერიტილის შემდეგ მიმდინარე იუზერის იმეილი
3. ამ ფუნქციამ იგივე 3 წამის შემდეგ დალოგვასთან ერთად უნდა გამოიძახოს callback ფუნქცია და გადასცეს მას პარამეტრად შემდეგი ობიექტი

   ```js
   { userEmail: email }
   ```

#### getUserVideos() function

1. შევმქმნათ ფუნქცია სახელად `getUserVideos()`, რომელიც მიიღებს `email`-ს და `callback`-ს არგუმენტებად.
2. ამ ფუნქციამ 2 წამის შემდეგ უნდა გამოიძახოს callback ფუნქცია და არგუმენტად გადასცეს მას ამ მეილის მქონე იუზერზე არსებული ვიდეოების სია (მასივი).

#### videoDetails() function

1. შევმქმნათ ფუნქცია სახელად `videoDetails()`, რომელიც მიიღებს `video`-ს და `callback`-ს არგუმენტებად.
2. ამ ფუნქციამ 2 წამის შემდეგ უნდა გამოიძახოს callback ფუნქცია და არგუმენტად გადასცეს მას ამ ვიდეოს სათაური(title).

### გამოყენების ნაწილი

1. შექმენით ფუნქცია სახელად `getPassedUsersFirstVideoTitle` რომელსაც გადავცემთ იუზერის სახელს შემდეგნაირად:
   ```js
   const getPassedUsersFirstVideoTitle = (user) => // your code goes here...
   ```
2. ეს ფუნქცია აბრუნებს loginUser ფუნქციის შედეგს, გადასაცემი პარამეტრები შემდეგნაირად:
3. loginUser ფუნქციას პირველ პარამეტრად გადავცეთ `email` = `"user1@hw.js"`.
4. loginUser ფუნქციას მეორე პარამეტრად გადავცეთ `password` = `1234`.
5. loginUser ფუნქციის მესამე პარამეტრად გადავცეთ ფუნქცია, რომელიც დალოგავს მიმდინარე იუზერს `user: *result*` და შემდეგ გამოიძახებს getUserVideos ფუნქციას
6. getUserVideos ფუნქციას პირველ ცვლადად გადავცეთ loginUser ფუნქციის მიერ დაბრუნებული userEmail key-ს მნიშვნელობა
7. getUserVideos ფუნქციას მეორე ცვლადად გადავცეთ ფუნქცია, რომელიც დალოგავს მიმდინარე მომხმარებლის ვიდეოების სიას(მასივს) `videos: *result*` და შემდეგ გამოიძახებს videoDetails ფუნქციას
8. videoDetails ფუნქციას პირველ ცვლადად გადავცეთ getUserVideos ფუნქციის მიერ დაბრუნებული ვიდეოების სიიდან(მასივიდან) პირველი ელემენტი
9. videoDetails ფუნქციას მეორე ცვლადად გადავცეთ ფუნქცია, რომელიც კონსოლში დალოგავს გადაცემული ვიდეოს სათაურს `title:*result*`.

## Homework-1 Test

use this guide to test your homework.

გამოყენების ნაწილში აღწერილ callback ების chain-ს კონსოლში უნდა ჰქონდეს მსგავსი შედეგი:

```bash
Output:

{
    "Start"
    "Finish"
    "Now we have the data of user: user1@hw.js"
    "user:" {
        userEmail: "user1@hw.js"
    }
    "videos:" (2) [
        0: {title: "video1"},
        1: {title: "video2"}
    ]
    "title: video1"
}
```

## Homework-2 (Using Callbacks +handle errors)

დავაკოპიროთ პირველი დავალების კოდი და ამ კოდზე დაყრდნობით დავამატოთ ფუნქციონალი

### მომზადების ნაწილი

1. შევქმნათ ერორების დასალოგი ფუქნცია და გავამზადოთ გამოსაყენებლად
   ```js
   function displayError(errorMessage) {
     console.error(new Error(errorMessage));
   }
   ```
2. დავარედაქტიროთ `loginUser()`, `getUserVideos()` და `videoDetails()` ფუნქციები. კერძოდ სამივე მათგანს დავუმატოთ კიდევ ერთი პარამეტრი, რომელიც შეასრულებს callback ფუნქციას და რომლის მიზანიც იქნება ერორის არსებობის შემთხვევაში მისი გაშვება
3. `loginUser()` ფუნქციაში დავამატოთ ლოგიკა, რომ თუ აღნიშნული მეილით იუზერი `usersDB` ში მოიძებნება, მაშინ გაეშვას პირველი callback ფუნქცია (როგორც წინა დავალებაში იყო, არაფერს არ ვცვლით, ისევ 3 წამის შემდეგ). ხოლო თუ ასეთი იუზერი არ მოიძებნა, მაშინ გაეშვას მეორე(ბოლოს დამატებული) callback ფუნქცია და არგუმენტად გადაეცეს string ტიპის ტექსტი მნიშვნელობით `"User not found!"`
4. `getUserVideos()` ფუნქციაში დავამატოთ ლოგიკა, რომ თუ აღნიშნული მეილით იუზერს გააჩნია ვიდეოები იმუშავოს ისე, როგორც წინა დავალებაში, ხოლო თუ არ გააჩნია ვიდეოები (მისი მასივი ცარიელია) მაშინ გაეშვას მეორე(ბოლოს დამატებული) callback ფუნქცია და არგუმენტად გადაეცეს string ტიპის ტექსტი მნიშვნელობით `"Video Title not found!"`
5. `videoDetails()` ფუნქციაში დავამატოთ ლოგიკა, რომ თუ აღნიშნული ვიდეოს ობიექტი შეიცავს სათაურს იმუშავოს ისე, როგორც წინა დავალებაში, ხოლო თუ არ შეიცავს სათაურს (title key-ს) მაშინ გაეშვას მეორე(ბოლოს დამატებული) callback ფუნქცია და არგუმენტად გადაეცეს string ტიპის ტექსტი მნიშვნელობით `"Video Title not found!"`
6. გაითვალისწინეთ, ბოლოს დამატებული callback ფუნქციებიც იგივე პრინციპით (ნახსენები დროის შემდეგ) უნდა გაეშვას და არა პირდაპირ.


### გამოყენების ნაწილი

1. ფუნქციებს `loginUser()`, `getUserVideos()` და `videoDetails()` დამატებულ ბოლო არგუმენტის(რომელიც error handling ის მიზნით დავამატეთ) მნიშვნელობად გადავცეთ ფუნქცია, რომელიც აიღებს დაბრუნებულ ცვლადს (რაც სტრინგად დავაბრუნეთ ამ ფუნქციებიდან) და გადასცემს მას `displayError` ფუნქციას, რომელიც თავის მხრივ კონსოლში დალოგავს ერორს იმ ტექსტით, რომელიც გადმოეცემა.


## Homework-2 Test

use this guide to test your homework.

### Test Case - 1

#### Code

```js
getPassedUsersFirstVideoTitle("user4@hw.js");
```

#### Output

```bash
{
    "Start"
    "Finish"
    > Error: User not found!
        at displayError ...
}
```




### Test Case - 2

#### Code

```js
getPassedUsersFirstVideoTitle("user3@hw.js");
```

#### Output

```bash
{
    "Start"
    "Finish"
    "Now we have the data of user: user3@hw.js"
    "user:" {
        userEmail: "user3@hw.js"
    }
    > Error: Videos not found!
        at displayError ...
}
```


### Test Case - 3

#### Code

```js
getPassedUsersFirstVideoTitle("user2@hw.js");
```

#### Output

```bash
{
    "Start"
    "Finish"
    "Now we have the data of user: user2@hw.js"
    "user:" {
        userEmail: "user2@hw.js"
    }
    "videos:" (2) [
        0: {title: "video1"},
        1: {title: "video2"}
    ]
    > Error: Videos not found!
        at displayError ...
}
```


### Test Case - 4

#### Code

```js
getPassedUsersFirstVideoTitle("user1@hw.js");
```

#### Output

```bash
{
    "Start"
    "Finish"
    "Now we have the data of user: user1@hw.js"
    "user:" {
        userEmail: "user1@hw.js"
    }
    "videos:" (2) [
        0: {title: "video1"},
        1: {title: "video2"}
    ]
    "title": video1
}
```


## Homework-3 (Using Promises)

დავაკოპიროთ მეორე დავალების კოდი და ამ კოდზე დაყრდნობით callback ების ლოგიკა ჩავანაცვლოთ Promise ებით.

**გაითვალისწინეთ:** error handling უნდა მოხდეს `.catch()` ში


## Homework-3 Test

For testing use the same test cases as it is in Homework-2.

Test Case ის code ებიც და Output ებიც უნდა იყოს იგივე რაც მეორე დავალების ტესტებშია მოცემული, შეიცვალა მხოლოდ ამოხსნის ლოგიკა, ამიტომ ტესტები უცვლელია.შეიცვალა მხოლოდ ამოხსნის ლოგიკა, ამიტომ ტესტები უცვლელია.


## Homework-4 (Using Async/Await)

დავაკოპიროთ მესამე დავალების კოდი და ამ კოდზე დაყრდნობით Promise ების ლოგიკა ჩავანაცვლოთ Async/Await ებით.

**გაითვალისწინეთ:** error handling უნდა მოხდეს `try ... catch` ის გამოყენებით.

## Homework-4 Test

For testing use the same test cases as it is in Homework-2.

Test Case ის code ებიც და Output ებიც უნდა იყოს იგივე რაც მეორე დავალების ტესტებშია მოცემული, შეიცვალა მხოლოდ ამოხსნის ლოგიკა, ამიტომ ტესტები უცვლელია.


# Uploading My Homework

დავალების ატვირთვისთვის იხელმძღვანელეთ შემდეგი მითითებით.

> **Note:** თუ ეს თქვენი პირველი დავალება არ არის გამოტოვეთ ნაბიჯი 1.

1. შექმენით `GitHub` ის `repository` სახელად `eAcademy-advanced-js-homeworks` და ლინკი დაწერეთ ჩვენს `Discord` ში `#homework-repos` thread ში.
2. თქვენს რეპოში შექმენით დირექტორიები შესაბამისად `/meeting-4/homework-1/` სადაც განათავსებთ თქვენს ამოხსნებს - `1-homework-solution.js`, `2-homework-solution.js `, `3-homework-solution.js` და `4-homework-solution.js`.
