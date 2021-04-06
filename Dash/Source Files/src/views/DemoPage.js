import React from 'react';
import { hot } from 'react-hot-loader';
import { TwoDimensionalImage, TwoDimensionalVideo } from "react-annotation-tool";
//import './DemoPage.css';

const DemoPage = () => {
	const handleSubmit = r => console.log(r);
	const imageAnnotations = [{
		id: 'jlyjm4py',
		name: 'jlyjm4py',
		type: 'Polygon',
		color: 'rgba(227,0,255,1)',
		vertices: [{
			id: 'jlyjm4py', name: 'jlyjm4py', x: 353.36249923706055, y: 258.8999938964844,
		}, {
			id: 'jlyjm5em', name: 'jlyjm5em', x: 444.79999923706055, y: 255.89999389648438,
		}, {
			id: 'jlyjm5v2', name: 'jlyjm5v2', x: 444.79999923706055, y: 269.8999938964844,
		}, {
			id: 'jlyjm6ci', name: 'jlyjm6ci', x: 477.79999923706055, y: 269.8999938964844,
		}, {
			id: 'jlyjm6ul', name: 'jlyjm6ul', x: 480.79999923706055, y: 285.8999938964844,
		}, {
			id: 'jlyjm7r8', name: 'jlyjm7r8', x: 356.79999923706055, y: 289.8999938964844,
		}],
		selectedOptions: [{ id: '0', value: 'root' }, { id: '2', value: 'Text' }, { id: '2-15', value: 'Suspicious' }],
	}];
	const options = {
		id: '0',
		value: 'root',
		children: [
			{
				id: '1',
				value: 'Object',
				children: [
					{
						id:
                        '1-1',
						value: 'Face',
						children: [
							{
								id: '1-1-1',
								value: 'Smile',
								children: [],
							},
						],
					},
					{ id: '1-2', value: 'Face Reflection', children: [] },
					{ id: '1-3', value: 'Framed Photo', children: [] },
					{ id: '1-4', value: 'Tattoo', children: [] },
					{ id: '1-5', value: 'Suspicious', children: [] },
					{ id: '1-6', value: 'Other', children: [] },
				],
			},
			{
				id: '2',
				value: 'Text',
				children: [
					{ id: '2-1', value: 'Letter', children: [] },
					{ id: '2-2', value: 'Computer Screen', children: [] },
					{ id: '2-3', value: 'Pill Bottle/Box', children: [] },
					{ id: '2-4', value: 'Miscellaneous Papers', children: [] },
					{ id: '2-5', value: 'Menu', children: [] },
					{ id: '2-6', value: 'Credit Card', children: [] },
					{ id: '2-7', value: 'Business Card', children: [] },
					{ id: '2-8', value: 'Poster', children: [] },
					{ id: '2-9', value: 'Clothing', children: [] },
					{ id: '2-10', value: 'Book', children: [] },
					{ id: '2-11', value: 'Receipt', children: [] },
					{ id: '2-12', value: 'Street Sign', children: [] },
					{ id: '2-13', value: 'License Plate', children: [] },
					{ id: '2-14', value: 'Newspaper', children: [] },
					{ id: '2-15', value: 'Suspicious', children: [] },
					{ id: '2-16', value: 'Other', children: [] },
				],
			},
		],
	};
	const previewNoticeList = [
		'Cells\' body range.',
		'The time that cells <u>split</u>, <u>leave</u>, <u>obscured</u> and <u>show up</u> (if applicable).',
	];
	const previewHeader = 'Please scan the video and observe the following to help you complete the task:';
	const emptyCheckSubmissionWarningText = 'Please annotate AND track one unmarked cell to complete this task.';
	const emptyCheckAnnotationItemWarningText = 'Step 2: Please track the cell bound by this box';
	const emptyAnnotationReminderText = 'Step 1: Click the button above to add a new box around a cell';
	return (
			<div className='mb-5'>
				<TwoDimensionalImage
					hasNextButton
					onNextClick={ handleSubmit }
					hasPreviousButton
					onPreviousClick={ handleSubmit }
					hasSkipButton
					onSkipClick={ handleSubmit }
					isDynamicOptionsEnable
					defaultAnnotations={ imageAnnotations }
					isLabelOn
					url={'https://github.com/IndianBoy42/yolov5/raw/hklpr//input/ALE03087.JPG',
					'https://www.gtice.is/wp-content/uploads/2015/06/Snaefellsnes_Tour_Kirkjufell_by_KateI.jpg'}
					imageWidth={ 600 }
					options={ options }
					disabledOptionLevels={ [] }   
				/>
			</div>
	);
};

export default hot(module)(DemoPage);