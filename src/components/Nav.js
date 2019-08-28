import React, { Component } from 'react';

export default class Nav extends Component {
	render() {
		return (
			<>
				<nav className="navbar navbar-default" id="first-nav">
					<div className="container">
						<div className="navbar-header">
							{/* FIP */}
							<a className="navbar-brand" href="https://www.canada.ca">
								<img alt="GC Logo" />
							</a>
							{/* Button to display contents of .navbar-collapse on mobile */}
							<button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu-items">
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						</div>
						{/* English / Français button */}
						<ul className="nav navbar-nav navbar-right" id="lang-button-desktop">
							<li><a href="#">Français</a></li>
						</ul>
					</div>
				</nav>
				
				<nav className="navbar navbar-default" id="second-nav">
					<div className="container">
						<div className="collapse navbar-collapse" id="menu-items">
							<ul className="nav navbar-nav navbar-right">
								<li><a href="#">Home</a></li>
								<li><a href="#">About</a></li>
								<li><a href="#">Browse</a></li>
								<li><a href="#">Departments</a></li>
								<li><hr /></li>
								<li id="lang-button-mobile"><a href="#">Français</a></li>
							</ul>
						</div>
					</div>
				</nav>
			</>
		);
	}
}
