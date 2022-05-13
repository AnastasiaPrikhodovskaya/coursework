package com.prihodovskaya.marketing;

import com.prihodovskaya.marketing.models.auth.ERole;
import com.prihodovskaya.marketing.models.auth.Role;
import com.prihodovskaya.marketing.models.subject.Method;
import com.prihodovskaya.marketing.models.subject.Question;
import com.prihodovskaya.marketing.models.subject.StandardAnswer;
import com.prihodovskaya.marketing.repository.MethodRepository;
import com.prihodovskaya.marketing.repository.QuestionRepository;
import com.prihodovskaya.marketing.repository.RoleRepository;
import com.prihodovskaya.marketing.repository.StandardAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@SpringBootApplication
public class MarketingApplication implements CommandLineRunner {

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	QuestionRepository questionRepository;

	@Autowired
	StandardAnswerRepository standardAnswerRepository;

	@Autowired
	MethodRepository methodRepository;

	public static void main(String[] args) {
		SpringApplication.run(MarketingApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if (roleRepository.findAll().isEmpty()) {
			roleRepository.save(new Role(ERole.ROLE_USER));
			roleRepository.save(new Role(ERole.ROLE_COMPANY));
			roleRepository.save(new Role(ERole.ROLE_ADMIN));
		}

		if (methodRepository.findAll().isEmpty()) {
			Method _method = new Method("Исследование рынка", "Типовая информация о вашей компании");
			methodRepository.save(_method);

			List<String> questionList = new	ArrayList<>(Arrays.asList("Если мы бы в настоящее время запустили наш новый продукт на рынке, по какой вероятности Вы бы пользовались им охотнее, чем существующими подобными продуктами конкурентов?", "Насколько важен для Вас комфорт при выборе между аналогичными продуктами?", "Какоe было Ваше общее впечатление от использования нашего нового продукта?", "Если бы мы в настоящее время запустили наш новый продукт на рынок, Вы бы порекомендовали его другим людям?", "Если бы мы в настоящее время запустили нашу новую услугу на рынке, по какой вероятности Вы бы пользовались ею охотнее, чем существующими подобными услугами конкурентов?", "Насколько важен для Вас комфорт при выборе между аналогичными услугами?", "Какое было Ваше общее впечатление от использования нашей новой услуги?", "Если бы мы в настоящее время запустили нашу новую услугу на рынке, Вы бы порекомендовали ее другим людям?", "Ваш возраст?"));
			List<List<String>> standardAnswers = new ArrayList<>();
			standardAnswers.add(new ArrayList<>(Arrays.asList("100 %", "60 % - 99 %", "40 % - 59 %", "1 % - 39 %", "0 %")));
			standardAnswers.add(new ArrayList<>(Arrays.asList("Максимально важен", "Значительно", "Скорее важен", "Скорее несущественный", "Почти несущественный", "Совсем несущественный")));
			standardAnswers.add(new ArrayList<>(Arrays.asList("Превосходное", "Хорошее", "Скорее хорошее", "Среднее", "Скорее плохое", "Очень плохое")));
			standardAnswers.add(new ArrayList<>(Arrays.asList("Безусловно да", "Да", "Скорее да", "Нет", "Безусловно нет", "Скорее нет")));
			standardAnswers.add(new ArrayList<>(Arrays.asList("100 %", "60 % - 99 %", "40 % - 59 %", "1 % - 39 %", "0 %")));
			standardAnswers.add(new ArrayList<>(Arrays.asList("Максимально важен", "Значительно", "Скорее важен", "Скорее несущественный", "Почти несущественный", "Совсем несущественный")));
			standardAnswers.add(new ArrayList<>(Arrays.asList("Превосходное", "Хорошее", "Скорее хорошее", "Среднее", "Скорее плохое", "Очень плохое")));
			standardAnswers.add(new ArrayList<>(Arrays.asList("Безусловно да", "Да", "Скорее да", "Скорее нет", "Нет", "Безусловно нет", "Скорее нет")));
			standardAnswers.add(new ArrayList<>(Arrays.asList("18-25", "25-30", "30-40", "40-50", "50+")));

			int i = 0;
			for (String questionStr : questionList) {
				Question _question = new Question(questionStr, _method);
				questionRepository.save(_question);

				for (String answer : standardAnswers.get(i)) {
					StandardAnswer standardAnswer = new StandardAnswer(answer, _question);
					standardAnswerRepository.save(standardAnswer);
				}
				i++;
			}

			Method method1 = new Method("Узнаваемость бренда", "Покажет насколько Ваша компания узнаваема.");
			methodRepository.save(method1);

			List<String> questionList1 = new	ArrayList<>(Arrays.asList("Знакомо ли Вам название нашей компании?", "Где Вы видели рекламу нашей компании?","Какое из следующих свойств связано с нашей компанией?", "Как Вы бы оценили качество продуктов наших продуктов?"));
			List<List<String>> standardAnswers1 = new ArrayList<>();
			standardAnswers1.add(new ArrayList<>(Arrays.asList("Никогда не слышал/а такое", "Когда-то слышал/а о ней, но никогда не покупал/а их продукт/услугу", "Время от времени я покупаю их продукты/услуги", "Регулярно покупаю их продукты/услуги")));
			standardAnswers1.add(new ArrayList<>(Arrays.asList("По телевидению, по радио", "В газетах/журналах", "В Интернете", "В общественном транспорте", "На билбордах", "Нигде")));
			standardAnswers1.add(new ArrayList<>(Arrays.asList("Годный к употреблению", "Безопасный", "Модный", "Достоверный", "Популярный", "Необходимый", "Стильный", "Надежный")));
			standardAnswers1.add(new ArrayList<>(Arrays.asList("100 %", "75 %", "50 %", "25 %", "0 %")));

			i = 0;
			for (String questionStr : questionList1) {
				Question _question = new Question(questionStr, method1);
				questionRepository.save(_question);

				for (String answer : standardAnswers1.get(i)) {
					StandardAnswer standardAnswer = new StandardAnswer(answer, _question);
					standardAnswerRepository.save(standardAnswer);
				}
				i++;
			}

			Method method2 = new Method("Эффективность и восприятие рекламы", "Покажет насколько эффективно покупатели воспринимают Вашу рекламу.");
			methodRepository.save(method2);

			List<String> questionList2 = new	ArrayList<>(Arrays.asList("Насколько Вы знакомы с нашими прокутами?", "Как хорошо Вы помните нашу рекламу?","Какое впечатление произвела на Вас реклама?", "Каким словом лучше всего описать нашу рекламу?", "Как Вы оцениваете нашу рекламу по сравнению с рекламами наших конкурентов?", "Каким образом Вы бы оценили \"силу\" рекламы?"));
			List<List<String>> standardAnswers2 = new ArrayList<>();
			standardAnswers2.add(new ArrayList<>(Arrays.asList("Я ими ежедневно пользуюсь.", "Я несколько раз пользовался/лась ими.", "Я знаю общую информацию о продукте.", "Я их совсем не знаю.")));
			standardAnswers2.add(new ArrayList<>(Arrays.asList("Хорошо.", "Я помню фирму, продукт, но не помню саму рекламу.", "Я помню только фирму.", "Я помню только продукт.", "Рекламу я совсем не помню.")));
			standardAnswers2.add(new ArrayList<>(Arrays.asList("Положительное", "Негативное")));
			standardAnswers2.add(new ArrayList<>(Arrays.asList("Привлекательная", "Скучная", "Развлекательная", "Креативная", "Энергичная", "Смешная", "Приятная", "Уникальная")));
			standardAnswers2.add(new ArrayList<>(Arrays.asList("Намного лучше", "Немножко лучше", "Такая же", "Немножко хуже", "Намного хуже")));
			standardAnswers2.add(new ArrayList<>(Arrays.asList("1 звезда", "2 звезды", "3 звезды", "4 звезды", "5 звезд")));

			i = 0;
			for (String questionStr : questionList2) {
				Question _question = new Question(questionStr, method2);
				questionRepository.save(_question);

				for (String answer : standardAnswers2.get(i)) {
					StandardAnswer standardAnswer = new StandardAnswer(answer, _question);
					standardAnswerRepository.save(standardAnswer);
				}
				i++;
			}

			Method method3 = new Method("Оценка удовлетворенности продуктом", "Покажет насколько покупатели удоблетворены вашим продуктом.");
			methodRepository.save(method3);

			List<String> questionList3 = new	ArrayList<>(Arrays.asList("Откуда Вы узнали о наших \"продуктах\" впервые?", "Как давно Вы начали пользоваться нашими \"продуктами\"?","Вы были довольны \"продуктом\"?", "Как часто Вы пользуетесь \"продуктом\"?", "Каково для Вас значение \"продукта\"?", "По сравнению с другими продуктами этого вида, качество нашего:", "Оцените, пожалуйста, общее качество нашего \"продукта\":", "Вы бы рекомендовали наш \"продукт\" другим лицам?"));
			List<List<String>> standardAnswers3 = new ArrayList<>();
			standardAnswers3.add(new ArrayList<>(Arrays.asList("По телевидению", "По радио", "В газете", "В журнале", "В Интернете/на веб-сайте", "У знакомых или друзей")));
			standardAnswers3.add(new ArrayList<>(Arrays.asList("Менее 1 месяца", "1-6 месяцев назад", "6-12 месяцев назад", "1-2 года назад", "Более 2-х лет назад")));
			standardAnswers3.add(new ArrayList<>(Arrays.asList("Совсем недоволен/льна", "Недоволен/льна", "Доволен/льна", "Очень доволен/льна")));
			standardAnswers3.add(new ArrayList<>(Arrays.asList("Ежедневно", "Один раз в неделю", "Более одного раза в неделю", "Каждые две недели", "Один раз в месяц", "Один раз в год", "Менее одного раза в год")));
			standardAnswers3.add(new ArrayList<>(Arrays.asList("Очень важное", "Важное", "Не важное", "Я им никогда не пользуюсь.")));
			standardAnswers3.add(new ArrayList<>(Arrays.asList("Намного хуже", "Хуже", "Такое же", "Лучше", "Намного лучше")));
			standardAnswers3.add(new ArrayList<>(Arrays.asList("Очень низкое", "Низкое", "Среднее", "Высокое")));
			standardAnswers3.add(new ArrayList<>(Arrays.asList("Да", "Нет")));

			i = 0;
			for (String questionStr : questionList3) {
				Question _question = new Question(questionStr, method3);
				questionRepository.save(_question);

				for (String answer : standardAnswers3.get(i)) {
					StandardAnswer standardAnswer = new StandardAnswer(answer, _question);
					standardAnswerRepository.save(standardAnswer);
				}
				i++;
			}

			Method method4 = new Method("Обслуживание клиентов – Обратная связь от заказчика", "Покажет насколько хорошо обслуживаются ваши клиенты.");
			methodRepository.save(method4);

			List<String> questionList4 = new	ArrayList<>(Arrays.asList("Как долго Вы ожидали ответ от нашего центра обслуживания клиентов?", "Насколько внимательно слушали Вас представители центра обслуживания клиентов?", "Насколько активны были представители обслуживания клиентов при попытке помочь Вам?", " Как быстро сумели представители нашего обслуживания клиентов Вам помочь?",
					"По Вашему мнению, представитель нашего центра обслуживания клиентов достаточно хорошо информирован?", "Насколько понятна была информация, которую Вы получили у нашего обслуживания клиентов?", "На сколько Ваших вопросов ответили представители нашего обслуживания клиентов?", "Насколько был для Вас наш центр обслуживание клиентов полезным?"));
			List<List<String>> standardAnswers4 = new ArrayList<>();
			standardAnswers4.add(new ArrayList<>(Arrays.asList("Очень долго", "Долго", "В пределах нормы", "Быстро", "Реакция была почти мгновенная.")));
			standardAnswers4.add(new ArrayList<>(Arrays.asList("Очень внимательно", "Внимательно", "Не слишком внимательно", "Совсем невнимательно")));
			standardAnswers4.add(new ArrayList<>(Arrays.asList("Очень активны", "Активны", "Скорее активны", "Не слишком активны", "Совсем неактивны")));
			standardAnswers4.add(new ArrayList<>(Arrays.asList("Очень быстро", "Быстро", "В пределах нормы", "Медленно", "Очень медленно")));
			standardAnswers4.add(new ArrayList<>(Arrays.asList("Очень хорошо", "Хорошо", "Скорее хорошо", "Скорее плохо", "Плохо")));
			standardAnswers4.add(new ArrayList<>(Arrays.asList("Полностью понятна", "Понятна", "Почти понятна", "Не слишком понятна", "Совсем непонятна")));
			standardAnswers4.add(new ArrayList<>(Arrays.asList("На все вопросы", "На большинство вопросов", "На половину вопросов", "На меньшинство вопросов", "На мои вопросы не было отвечено.")));
			standardAnswers4.add(new ArrayList<>(Arrays.asList("Очень полезный", "Частично полезный", "Не слишком полезный", "Не был полезным")));

			i = 0;
			for (String questionStr : questionList4) {
				Question _question = new Question(questionStr, method4);
				questionRepository.save(_question);

				for (String answer : standardAnswers4.get(i)) {
					StandardAnswer standardAnswer = new StandardAnswer(answer, _question);
					standardAnswerRepository.save(standardAnswer);
				}
				i++;
			}
		}
	}
}
