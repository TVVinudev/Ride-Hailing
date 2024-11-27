import React from 'react'
import about from '../assets/images/about.jpg'
const Contact = () => {
    return (
        <>

            <div className="w-full h-auto md:h-[40vh] shadow-lg bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(112.1deg, rgba(32, 38, 57, 0.351) 11.4%, rgb(227, 162, 97, 0.9) 70.2%), url(${about})` }}>
                <div className="flex justify-center items-center pt-20">
                    <span className="text-[80px] font-semibold uppercase text-white">Contact Us</span>
                </div>
            </div>
            <div className="bg-white" >
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">

                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500  sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                    <form action="#" className="space-y-8">
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="name@flowbite.com" required />
                        </div>
                        <div>
                            <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                            <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 " placeholder="Let us know how we can help you" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                            <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                        </div>
                        <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-yellow-500 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300">Send message</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact