import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed(" ERROR ") + " " + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(" HELP ")}
     Без параметров - вывод погоды,
     -h для вывода помощи,
     -s [CITY] для установки города,
     -t [API_KEY] для сохранения токена.
    `
  );
};

const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgBlue(" WEATHER ")} Погода в городе ${res.name}
  ${icon}  ${res.weather[0].description}
  Температура: ${res.main.temp}°C (ощущается как ${res.main.feels_like}°C)
  Давление: ${res.main.pressure} мм рт. ст.
  Влажность: ${res.main.humidity}%
  Скорость ветра: ${res.wind.speed} м/с, порывы до ${res.wind.gust} м/с
 `
  );
};

export { printError, printSuccess, printHelp, printWeather };
