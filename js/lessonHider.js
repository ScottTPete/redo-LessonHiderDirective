angular.module('directivePractice')
	.directive('lessonHider', function() {
		return {
			restrict: 'E',
			templateUrl: 'js/lessonHiderTmpl.html',
			scope: {
				lesson: '=',
				dayAlert: '&'
				
			},
			controller: function($scope, lessonService) {
				$scope.getSchedule = lessonService.getSchedule()
			},
			
			//link function in directives is primarily used when you need to manipulate the dom, feels a lot like jquery(angular uses jquery lite)
			link: function(scope, element, attributes) {
				console.log(scope); //Logs out object containing angular properties
				console.log(element); //the DOM element
				console.log(attributes); //will log out attributes attached to <lesson-hider>

				scope.getSchedule.then(function (response) {
					scope.schedule = response.data;
					
					scope.schedule.forEach(function(day) {
						if (day.lesson === scope.lesson) {
							element.css('text-decoration', 'line-through');
							scope.lessonDay = day.weekday;
							scope.checked = false;
							return;
						}
					});
				});
				
				scope.toggleLine = function() {
					if (scope.checked) {
						element.css('text-decoration', 'none')
					} else {
						element.css('text-decoration', 'line-through')
					}
				};
				
				scope.removeLesson = function() {
					element.remove(); //will remove the selected element(s) and its child elements || why not just the button?
				}
			
			
			}
		}
})