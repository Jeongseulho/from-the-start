// github api로 모든 repo의 언어별 bytes 가져오기

let javascriptBytes = 0;
let cssBytes = 0;
let htmlBytes = 0;

const donut_data_html = document.querySelector('.donut-text-html .donut-data');
const donut_data_css = document.querySelector('.donut-text-css .donut-data');
const donut_data_js = document.querySelector('.donut-text-js .donut-data');

const donut_segment_html = document.querySelector('.donut-segment-html');
const donut_segment_css = document.querySelector('.donut-segment-css');
const donut_segment_js = document.querySelector('.donut-segment-js');

const donut_animation_html = document.styleSheets[0].cssRules[0];
const donut_animation_css = document.styleSheets[0].cssRules[1];
const donut_animation_js = document.styleSheets[0].cssRules[2];
const requestOptions = {
	method: 'GET',
	redirect: 'follow',
};

const getRepoNameArray = async () => {
	try {
		const response = await fetch(
			'https://api.github.com/users/Jeongseulho/repos',
			requestOptions,
		);
		const data = await response.json();
		const result = data.map((repo) => repo.name);

		return result;
	} catch (error) {
		console.log('에러', error);
	}
};

const getLangBytes = async (repoName) => {
	try {
		const response = await fetch(
			`https://api.github.com/repos/Jeongseulho/${repoName}/languages`,
			requestOptions,
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.log('에러', error);
	}
};

const getAllLangBytes = async () => {
	const repoNameArray = await getRepoNameArray();

	const repoLangArray = [];

	for (const repoName of repoNameArray) {
		let result = await getLangBytes(repoName);
		repoLangArray.push(result);
	}

	repoLangArray.forEach((repoLang) => {
		if (repoLang?.JavaScript) {
			javascriptBytes += repoLang.JavaScript;
		}
		if (repoLang?.HTML) {
			htmlBytes += repoLang.HTML;
		}
		if (repoLang?.CSS) {
			cssBytes += repoLang.CSS;
		}
	});
};

const sendAllLangData = async () => {
	await getAllLangBytes();

	donut_data_html.innerHTML = `${htmlBytes} Bytes`;
	donut_data_css.innerHTML = `${cssBytes} Bytes`;
	donut_data_js.innerHTML = `${javascriptBytes} Bytes`;

	const htmlRatio = Math.round(
		(htmlBytes / (javascriptBytes + cssBytes + htmlBytes)) * 100,
	);
	const cssRatio = Math.round(
		(cssBytes / (javascriptBytes + cssBytes + htmlBytes)) * 100,
	);
	const jsRatio = Math.round(
		(javascriptBytes / (javascriptBytes + cssBytes + htmlBytes)) * 100,
	);

	donut_segment_html.setAttribute(
		'stroke-dasharray',
		`${htmlRatio} ${100 - htmlRatio}`,
	);
	donut_segment_css.setAttribute(
		'stroke-dasharray',
		`${cssRatio} ${100 - cssRatio}`,
	);
	donut_segment_js.setAttribute(
		'stroke-dasharray',
		`${jsRatio} ${100 - jsRatio}`,
	);

	donut_animation_html.appendRule(`100% {
    stroke-dasharray: ${htmlRatio}, ${100 - htmlRatio};
  }`);
	donut_animation_css.appendRule(`100% {
    stroke-dasharray: ${cssRatio}, ${100 - cssRatio};
  }`);
	donut_animation_js.appendRule(`100% {
    stroke-dasharray: ${jsRatio}, ${100 - jsRatio};
  }`);
};

sendAllLangData();
