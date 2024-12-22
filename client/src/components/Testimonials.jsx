import React from "react";

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          What our <span className="text-emerald-500">clients</span> say
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500 dark:text-gray-300">
          Join our community of satisfied users who’ve taken control of their
          finances effortlessly with our app. Read their stories and discover
          how we’ve made a difference in their lives!
        </p>

        <div className="grid grid-cols-1 gap-8 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-7xl">
          <div className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 md:p-8">
            <p className="leading-loose text-gray-500 dark:text-gray-300">
              "This application has transformed the way I manage my expenses.
              The intuitive dashboard and detailed reports have made tracking my
              spending effortless!"
            </p>

            <div className="flex items-center mt-6">
              <div className="mx-4">
                <h1 className="font-semibold text-emerald-500">Robbert</h1>
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  CTO, Robert Consultancy
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 md:p-8">
            <p className="leading-loose text-gray-500 dark:text-gray-300">
              "I love how secure and user-friendly the platform is. It’s the
              perfect tool for managing personal and professional finances all
              in one place!"
            </p>

            <div className="flex items-center mt-6">
              <div className="mx-4">
                <h1 className="font-semibold text-emerald-500">Mia Brown</h1>
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  Marketing Manager at Stech
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
