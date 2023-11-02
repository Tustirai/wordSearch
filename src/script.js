const words = [
	"BUDGETING",
	"SAVINGS",
	"INVESTING",
	"RETIREMENT",
	"DEBT",
	"CREDIT",
	"INCOME",
	"EXPENSES",
	"RENT",
	"PAYMENTS",
	"EMPLOYMENT",
	"CASH",
	"EMERGENCY",
	"GOALS",
	"WEALTH",
];

const puzzle = document.querySelector("#puzzleArea");

document.addEventListener("DOMContentLoaded", function () {
	arrangeGame();
});

function arrangeGame() {
	const hint = document.querySelector("#hint");
	words.forEach((element) => {
		hint.innerHTML += "<li>" + element + "</li>";
	});

	const rows = 14;
	const cols = 14;
	let html = "";
	for (let i = 0; i < rows; i++) {
		html += "<div class='row'>";
		for (let j = 0; j < cols; j++) {
			html += `<div class='col singleWord' data-row='${i}' data-col='${j}'></div>`;
		}
		html += "</div>";
	}
	puzzle.innerHTML = html;

	placeLetters(words);

	function placeLetters(myArr) {
		const positions = ["rows", "column", "diagonal"];

		for (let i = 0; i < myArr.length; i++) {
			let orientation =
				positions[Math.floor(Math.random() * positions.length)];
			let placed = false;
			for (let j = 0; j < 100 && !placed; j++) {
				let startRow = Math.floor(Math.random() * rows);
				let startCol = Math.floor(Math.random() * cols);
				if (canPlaceWord(myArr[i], startRow, startCol, orientation)) {
					placeWord(myArr[i], startRow, startCol, orientation);
					placed = true;
				}
			}
		}
	}

	function canPlaceWord(word, startRow, startCol, orientation) {
		const wordLength = word.length;
		switch (orientation) {
			case "rows":
				if (startCol + wordLength > cols) {
					return false;
				}
				for (let i = 0; i < wordLength; i++) {
					let box = document.querySelector(
						`.singleWord[data-row='${startRow}'][data-col='${
							startCol + i
						}']`
					);
					if (box.textContent !== "" && box.textContent !== word[i]) {
						return false;
					}
				}
				return true;
			case "column":
				if (startRow + wordLength > rows) {
					return false;
				}
				for (let i = 0; i < wordLength; i++) {
					let box = document.querySelector(
						`.singleWord[data-row='${
							startRow + i
						}'][data-col='${startCol}']`
					);
					if (box.textContent !== "" && box.textContent !== word[i]) {
						return false;
					}
				}
				return true;
			case "diagonal":
				if (
					startRow + wordLength > rows ||
					startCol + wordLength > cols
				) {
					return false;
				}
				for (let i = 0; i < wordLength; i++) {
					let box = document.querySelector(
						`.singleWord[data-row='${startRow + i}'][data-col='${
							startCol + i
						}']`
					);
					if (box.textContent !== "" && box.textContent !== word[i]) {
						return false;
					}
				}
				return true;
		}
	}

	function placeWord(word, startRow, startCol, orientation) {
		const wordLength = word.length;
		switch (orientation) {
			case "rows":
				for (let i = 0; i < wordLength; i++) {
					let box = document.querySelector(
						`.singleWord[data-row='${startRow}'][data-col='${
							startCol + i
						}']`
					);
					box.textContent = word[i];
					box.style.whiteSpace = "nowrap";
				}
				break;
			case "column":
				for (let i = 0; i < wordLength; i++) {
					let box = document.querySelector(
						`.singleWord[data-row='${
							startRow + i
						}'][data-col='${startCol}']`
					);
					box.textContent = word[i];
					box.style.whiteSpace = "nowrap";
				}
				break;
			case "diagonal":
				for (let i = 0; i < wordLength; i++) {
					let box = document.querySelector(
						`.singleWord[data-row='${startRow + i}'][data-col='${
							startCol + i
						}']`
					);
					box.textContent = word[i];
					box.style.whiteSpace = "nowrap";
				}
				break;
		}
	}
}
