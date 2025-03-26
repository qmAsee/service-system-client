import training_courses_1 from "../assets/training_courses_1.jpg";
import training_courses_smile from "../assets/training_courses_smile.png";

export const mock_training_courses = [
    {
        title: "Welcome to The Fresh Bowl",
        lessons: 1,
        tests: 2,
        ico: training_courses_smile,
        image: training_courses_1,
    },
    {
        title: "Welcome to The Fresh Bowl",
        lessons: 1,
        tests: 0,
        ico: training_courses_smile,
        image: training_courses_1,
    },
    {
        title: "Welcome to The Fresh Bowl",
        lessons: 1,
        tests: 3,
        ico: training_courses_smile,
        image: training_courses_1,
    },
];

export const new_mock_training_courses = [
  {
      id: "course_001",
      image: training_courses_1,
      title: "Искусство обслуживания в ресторане",
      description:
          "Этот курс научит вас основам профессионального обслуживания гостей в ресторане. Вы узнаете, как правильно приветствовать посетителей и создавать приятную атмосферу. Освоите техники общения с клиентами и правила сервировки стола. Курс поможет справляться с жалобами и сложными ситуациями. Он идеально подходит для новых сотрудников и тех, кто хочет улучшить свои навыки. После прохождения вы станете уверенным и компетентным официантом.",
      completedLessons: 1,
      completedTests: 1,
      lessons: [
          {
              id: "lesson_001",
              title: "Введение в обслуживание гостей",
              blocks: [
                  {
                      id: "block_001",
                      blockTitle: "Первое впечатление",
                      blockText:
                          "Первое впечатление складывается в первые 30 секунд общения с гостем. Улыбка, вежливость и аккуратный внешний вид — ключ к успеху.",
                      media: [
                          "https://example.com/images/smiling-waiter.png",
                          "https://example.com/videos/greeting.mp4",
                      ],
                  },
                  {
                      id: "block_002",
                      blockTitle: "Правила этикета",
                      blockText:
                          "Узнайте, как правильно подавать блюда и напитки, сохраняя высокий уровень сервиса.",
                      media: ["https://example.com/images/table-setting.jpg"],
                  },
              ],
          },
          {
              id: "lesson_002",
              title: "Работа с заказами",
              blocks: [
                  {
                      id: "block_003",
                      blockTitle: "Прием заказа",
                      blockText:
                          "Научитесь записывать заказы точно и быстро, учитывая пожелания гостей.",
                      media: ["https://example.com/images/order-taking.png"],
                  },
              ],
          },
      ],
      tests: [
          {
              id: "test_001",
              title: "Проверка знаний по приветствию",
              description:
                  "Тест проверит, как хорошо вы усвоили правила встречи гостей.",
              questions: [
                  {
                      id: "question_001",
                      question: "Что нужно сделать при встрече гостя?",
                      timeLimit: 60,
                      correctAnswersCount: 1,
                      type: "single",
                      hint: "Это первое действие официанта",
                      options: [
                          "Улыбнуться",
                          "Проверить заказ",
                          "Уйти",
                          "Подать меню",
                      ],
                      correctAnswer: "Улыбнуться",
                  },
                  {
                      id: "question_002",
                      question: "Какие элементы важны для этикета?",
                      timeLimit: 90,
                      correctAnswersCount: 2,
                      type: "multiple",
                      hint: "Подумайте о внешнем виде и поведении",
                      options: [
                          "Униформа",
                          "Громкий голос",
                          "Вежливость",
                          "Скорость",
                      ],
                      correctAnswers: ["Униформа", "Вежливость"],
                  },
              ],
          },
          {
              id: "test_002",
              title: "Тест по работе с заказами",
              description:
                  "Проверьте свои навыки в приеме и обработке заказов.",
              questions: [
                  {
                      id: "question_003",
                      question:
                          "Что делать, если гость хочет изменить заказ?",
                      timeLimit: 120,
                      correctAnswersCount: 1,
                      type: "open",
                      hint: "Это связано с гибкостью",
                      correctAnswer:
                          "Вежливо уточнить новый заказ и передать на кухню",
                  },
              ],
          },
      ],
  },
  {
      id: "course_002",
      image: training_courses_1,
      title: "Безопасность на кухне",
      description:
          "Курс посвящен основам безопасности при работе на кухне ресторана. Вы узнаете, как правильно обращаться с оборудованием и избегать травм. Освоите правила хранения продуктов и поддержания чистоты. Уроки помогут вам понять, как реагировать на чрезвычайные ситуации. Этот курс обязателен для всех сотрудников кухни. После обучения вы сможете работать безопасно и эффективно.",
      completedLessons: 0,
      completedTests: 0,
      lessons: [
          {
              id: "lesson_003",
              title: "Основы гигиены",
              blocks: [
                  {
                      id: "block_004",
                      blockTitle: "Мытье рук",
                      blockText:
                          "Регулярное мытье рук предотвращает распространение бактерий и обеспечивает безопасность блюд.",
                      media: ["https://example.com/videos/hand-washing.mp4"],
                  },
                  {
                      id: "block_005",
                      blockTitle: "Уборка рабочего места",
                      blockText:
                          "Чистота на кухне — залог качественной работы и соблюдения норм.",
                      media: ["https://example.com/images/clean-kitchen.jpg"],
                  },
              ],
          },
      ],
      tests: [
          {
              id: "test_003",
              title: "Тест по гигиене",
              description:
                  "Проверка знаний о санитарных нормах на кухне.",
              questions: [
                  {
                      id: "question_004",
                      question: "Как часто нужно мыть руки?",
                      timeLimit: 60,
                      correctAnswersCount: 1,
                      type: "single",
                      hint: "Это зависит от контакта с продуктами",
                      options: [
                          "Каждый час",
                          "Перед работой с едой",
                          "Раз в смену",
                          "Никогда",
                      ],
                      correctAnswer: "Перед работой с едой",
                  },
              ],
          },
      ],
  },
];
