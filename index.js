import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const holidays = [
  { date: "1/1/2022", name: "Confraternização mundial" },
  { date: "3/1/2022", name: "Carnaval" },
  { date: "4/17/2022", name: "Páscoa" },
  { date: "4/21/2022", name: "Tiradentes" },
  { date: "5/1/2022", name: "Dia do trabalho" },
  { date: "6/16/2022", name: "Corpus Christi" },
  { date: "9/7/2022", name: "Independência do Brasil" },
  { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2022", name: "Finados" },
  { date: "11/15/2022", name: "Proclamação da República" },
  { date: "12/25/2022", name: "Natal" },
];

app.get("/holidays", (req, res) => {
  res.send(holidays);
});

app.get("/is-today-holiday", (req, res) => {
  let nameHoliday = "";
  const today = new Date();
  const dateTodayFormat = `${today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;

  if (checkHoliday()) res.send(`Sim, hoje é ${nameHoliday}`);
  else res.send("Não, hoje não é feriado");

  function checkHoliday() {
    holidays.forEach((holiday) => {
      if (holiday.date === dateTodayFormat) {
        nameHoliday = holiday.name;
      }
    });
    return nameHoliday !== "";
  }
});

app.get("/holidays/:mothParam", (req, res) => {
  const mothParam = req.params.mothParam;
  const mothIsInvalid = parseInt(mothParam) <= 0 || parseInt(mothParam) > 12;
  if (mothIsInvalid) res.send("Não existe mês com este número");

  let response = holidays.filter((holiday) => {
    let moth = holiday.date.split("/")[0];
    return moth === mothParam;
  });

  if (response.length === 0) res.send("Não existe feriados nesse mês");
  res.send(response);
});

app.listen(5500);
