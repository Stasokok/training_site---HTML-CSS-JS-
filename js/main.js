const Training = () => {
	const form = document.querySelector('.form');
	const inputBenchPress = document.getElementById('benchpress');
	const inputSquat = document.getElementById('squat');
	const inputArmyBenchPress = document.getElementById('armybenchpress');
	const inputDeadLift = document.getElementById('deadlift');
	const submitForm = document.getElementById('submit-form'); 
	const dayCart = document.querySelector('.programm');
	const recalc = document.querySelector('.recalculation');
	const hideBtn = document.querySelector('.hide_btn');

	let weekArr = ['Первая неделя', 'Вторая неделя', 'Третья неделя', 'Четвертая неделя'];
	let dayArr = ['Первый день', 'Второй день', 'Третий день', 'Четвертый день'];
	let exerciseArr = ['Жим лежа', 'Присяд', 'Армейский жим', 'Становая тяга'];
	let firstWeek = [0.65, 0.75, 0.85];
	let secondWeek = [0.70, 0.80, 0.90];
	let thirdWeek = [0.75, 0.85, 0.95];
	let fourthWeek = [0.40, 0.50, 0.60];

	let numberOfTraining = 0;
	const PM = [];

	const TrainingObj = {
		id: '',
		nameOfWeek: '',
		nameOfDay: '',
		nameOfExercise: '',
		firstTouch: '',
		secondTouch: '',
		thirdTouch: '' 
	};


	submitForm.addEventListener('click', (event) => {
		event.preventDefault();
		PM[0] = inputBenchPress.value;
		PM[1] = inputSquat.value;
		PM[2] = inputArmyBenchPress.value;
		PM[3] = inputDeadLift.value;

		createProgramm();
		renderItems()
		

	});

	// действия по клику формы

	const createObj = (week) => {
		for (i = 0; i < exerciseArr.length; i++) {
			TrainingObj.nameOfExercise = exerciseArr[i];
			TrainingObj.nameOfDay = dayArr[i];
			TrainingObj.firstTouch = Math.ceil(PM[i] * week[0]);
			TrainingObj.secondTouch = Math.ceil(PM[i] * week[1]);
			TrainingObj.thirdTouch = Math.ceil(PM[i] * week[2]);
			numberOfTraining = numberOfTraining + 1;
			TrainingObj.id = numberOfTraining;
			if (numberOfTraining <= 16) {
				localStorage.setItem(`Day${numberOfTraining}`, JSON.stringify(TrainingObj));
			} else {
				numberOfTraining = 0
			}
		}
		

	};

	//создание объекта и добавление в local storage

	const createProgramm = () => {
		weekArr.forEach((item, i) =>  {
			TrainingObj.nameOfWeek = weekArr[i];
			if (i == 0) {
				createObj(firstWeek);
			} else if (i == 1) {
				createObj(secondWeek);
			} else if (i == 2) {
				createObj(thirdWeek);
			} else if (i == 3) {
				createObj(fourthWeek);
			} 
		
		});
	};

	//создание программы по дням недели

	console.log(PM);

	const renderItems = () => {
		 form.innerHTML = ''
		 hideBtn.style.display = 'inline-flex'
		 for (i = 1; i < 17; i++) {
			const item = JSON.parse(localStorage.getItem(`Day${i}`))
			const day = document.createElement('div');

						
			if (i <= 4) {
        		day.classList.add('day');
				day.innerHTML = `
						<ul>
							<li>${item.nameOfWeek}</li>
							<li>${item.nameOfDay}</li>
							<li>${item.nameOfExercise}</li>
							<li>1x5 - ${item.firstTouch}</li>
							<li>1x5 - ${item.secondTouch}</li>
							<li>1x5 - ${item.thirdTouch}</li>
	  					</ul>`;
			} else if (i > 4 && i <= 8) {
        		day.classList.add('day');
				day.innerHTML = `
						<ul>
							<li>${item.nameOfWeek}</li>
							<li>${item.nameOfDay}</li>
							<li>${item.nameOfExercise}</li>
							<li>1x3 - ${item.firstTouch}</li>
							<li>1x3 - ${item.secondTouch}</li>
							<li>1x3 - ${item.thirdTouch}</li>
	  					</ul>`;

			} else if (i > 8 && i <= 12) {
        		day.classList.add('day');
				day.innerHTML = `
						<ul>
							<li>${item.nameOfWeek}</li>
							<li>${item.nameOfDay}</li>
							<li>${item.nameOfExercise}</li>
							<li>1x5 - ${item.firstTouch}</li>
							<li>1x3 - ${item.secondTouch}</li>
							<li>1x1 - ${item.thirdTouch}</li>
	  					</ul>`;
			} else if (i > 12 && i <= 16) {
				day.classList.add('day');
				day.innerHTML = `
						<ul>
							<li>${item.nameOfWeek}</li>
							<li>${item.nameOfDay}</li>
							<li>${item.nameOfExercise}</li>
							<li>1x5 - ${item.firstTouch}</li>
							<li>1x5 - ${item.secondTouch}</li>
							<li>1x5 - ${item.thirdTouch}</li>
	  					</ul>`;
			} 


		dayCart.append(day);
		
		}
	}

	//вывод данных на страницу

	// const clearStorage = () => {
	// 	if (localStorage.getItem('Day1')) {
	// 		localStorage.clear()
	// 		dayCart.innerHTML = ''
	// 	} else {
	// 		createProgramm();
	// 		renderItems()
	// 	}

	// }

	// //очистка формы
	
	recalc.addEventListener('click', () => {
		localStorage.clear()

	});
};

Training()
