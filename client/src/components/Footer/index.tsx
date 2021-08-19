import React from 'react';

const Footer = () => (
	<footer className="absolute w-full bottom-0 pb-6">
		<div className="container mx-auto px-4">
			<hr className="mb-6 border-b-1 border-blueGray-600" />
			<div className="flex flex-wrap items-center md:justify-between justify-center">
				<div className="w-full md:w-4/12 px-4">
					<div className="text-sm text-white font-semibold py-1">
						Copyright ©
						<a
							href="https://www.creative-tim.com"
							className="text-white hover:text-blueGray-300 text-sm font-semibold py-1"
							target="_blank"
							rel="noreferrer"
						>
							Postly
						</a>
					</div>
				</div>
				<div className="w-full md:w-8/12 px-4">
					<ul className="flex flex-wrap list-none md:justify-end  justify-center">
						<li>
							<a
								href="https://www.creative-tim.com"
								className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
								target="_blank"
								rel="noreferrer"
							>
								Termo de Uso
							</a>
						</li>
						<li>
							<a
								href="https://www.creative-tim.com/presentation"
								className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
								target="_blank"
								rel="noreferrer"
							>
								Política de Privacidade
							</a>
						</li>
						<li>
							<a
								href="https://www.creative-tim.com/blog"
								className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
								target="_blank"
								rel="noreferrer"
							>
								Ajuda
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
);

export default Footer;
