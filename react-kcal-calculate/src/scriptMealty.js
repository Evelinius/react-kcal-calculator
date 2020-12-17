//Этот скрипт можно вставить в консоль на сайте милти, он выведет в таблицу название + описание, вес, кбжу и фото блюда

let categories = [...document.querySelectorAll(".category-wrapper")].slice(1, 5),
    meals = categories.map((c) => [...c.querySelectorAll(".meal-card")]).flat(),
    getNumber = (meal, selector) => +meal.querySelector(selector).innerText.replace(",", "."),
    getTotal = (info, key) => +((info.weight / 100) * info[key]).toFixed(2),
    getImage = (meal, selector) => {
        const children = meal.querySelector(selector).children
        const imageChild = children.length == 1 ? children[0] : children[1]
        return imageChild.getAttribute("src")
    };
result = meals
    .map((meal) => ({
        name: meal.querySelector(".meal-card__name").innerText + " " + (meal.querySelector(".meal-card__name-note").innerText),
        weight: getNumber(meal, ".meal-card__weight"),
        proteins: getNumber(meal, ".meal-card__proteins"),
        fats: getNumber(meal, ".meal-card__fats"),
        carbohydrates: getNumber(meal, ".meal-card__carbohydrates"),
        calories: getNumber(meal, ".meal-card__calories"),
        image: getImage(meal, ".meal-card__image")
    }))
    .map((info) => ({
        ...info,
        tProteins: getTotal(info, "proteins"),
        tFats: getTotal(info, "fats"),
        tCarbohydrates: getTotal(info, "carbohydrates"),
        tCalories: getTotal(info, "calories"),
    }));
console.table(result);
JSON.stringify(result);