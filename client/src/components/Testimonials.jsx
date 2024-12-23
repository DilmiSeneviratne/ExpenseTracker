import React, { useState, useEffect } from "react";
import axios from "axios";


const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/testimonials/all"); // Backend API endpoint
        // Filter only positive testimonials based on sentiment score
        const positiveTestimonials = response.data.filter((testimonial) => testimonial.sentimentScore > 0);
        setTestimonials(positiveTestimonials);
      } catch (err) {
        setError("Failed to load testimonials.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <p>Loading testimonials...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="p-6 bg-gray-100 rounded-lg dark:bg-gray-800 md:p-8"
            >
              <p className="leading-loose text-gray-500 dark:text-gray-300">
                "{testimonial.message}"
              </p>

              <div className="flex items-center mt-6">
                <div className="mx-4">
                  <h1 className="font-semibold text-emerald-500">
                    {testimonial.name}
                  </h1>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {testimonial.email}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
