import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {
    BsFacebook,
    BsInstagram,
    BsTwitter,
    BsGithub,
    BsDribbble,
}
    from 'react-icons/bs'
const FooterApp = () => {
    return (
        <Footer container className='border border-t-8 border-indigo-500/75 mt-[100px]'>
            <div className='w-full max-w-[1200px] mx-auto'>
                <div className='flex flex-col sm:flex-row gap-4 sm:items-center justify-between  '>
                    <div className='mt-5'>
                        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl
                             font-semibold dark:text-white
          '>
                            <span className='px-2 py-1 bg-gradient-to-r from-[#a18cd1] via-purple-400
                           to-[#fbc2eb] rounded-lg text-white'>Dung Blog</span>
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-7'>
                        <div>
                            <Footer.Title title="about" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='https://react.dev/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    ReactJs
                                </Footer.Link>
                                <Footer.Link
                                    href='https://tailwindcss.com/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Tailwind CSS
                                </Footer.Link>
                                <Footer.Link
                                    href='https://www.flowbite-react.com'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Flowbite React
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow me" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='https://github.com/nminhdung'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Github
                                </Footer.Link>
                                <Footer.Link>Discord</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='#'
                                >
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link>
                                    Temp & Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>

                </div>
                <Footer.Divider className='border-indigo-500/75'/>
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright href='#' by='Minh Dung' year={new Date().getFullYear()} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} />
                        <Footer.Icon href="#" icon={BsInstagram} />
                        <Footer.Icon href="#" icon={BsTwitter} />
                        <Footer.Icon href="#" icon={BsGithub} />
                        <Footer.Icon href="#" icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default FooterApp;