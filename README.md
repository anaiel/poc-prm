# POC for Pedagogical Resource Management

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Context

Pedagogical resources are a way to descrube a hierrachical structure of exercices:
* A module is a collection of objectives
* An objective is a collection of activities
* An activity is a collection of exercices

The new feature under development is to allow a teacher to activate/deactivate a pedagogical resource (PR).

From the student's point of view :
* modules are independent units of learning
* objectives and activities are linked, in the sense that success to one objective/activity can be a prerequisite for access to another objective/ativity

The current task is to test the feasibility of the page where the teacher can activate/deactivate a PR using `react-hook-form` knowing that:
* The teacher can toggle a PR on and off
* If the toggled-off PR has dependencies, they should also be shown as deactivated
* A PR that is deactivated as a result of a dependency cannot be activated.
* The teacher can toggle all PRs on with a single control
* The teacher can revert all changed they made
* The teacher can do/undo their last action
