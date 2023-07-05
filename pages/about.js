import React from 'react';
import Layout from '../components/layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">About Dashbyte</h2>

        <div className="flex items-center justify-between">
          <div className="w-full md:w-1/3">
            <h3 className="text-3xl text-gray-800 font-bold">Our Mission</h3>
            <p className="mt-4 text-gray-600">At Dashbyte, our mission is to provide a seamless and interactive user experience. We aim to maintain a consistent chat context across all pages, allowing users to continue their conversation with the AI as they navigate through the site.</p>
          </div>

          <div className="w-full md:w-1/3">
            <h3 className="text-3xl text-gray-800 font-bold">Our Vision</h3>
            <p className="mt-4 text-gray-600">Our vision is to leverage the most advanced features of our tech stack to provide robust data management and scalability. We are committed to expanding the range of services offered and further refining the chat interface for a more intuitive and engaging user experience.</p>
          </div>

          <div className="w-full md:w-1/3">
            <h3 className="text-3xl text-gray-800 font-bold">Our Values</h3>
            <p className="mt-4 text-gray-600">Our values are centered around providing intelligent and interactive responses to user inputs. We believe in the power of AI and are dedicated to integrating more advanced natural language processing capabilities into our services.</p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl text-gray-800 font-bold mb-2">Meet Our Team</h3>

          <div className="flex flex-wrap -mx-4 mt-6">
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6">
              <div className="bg-white rounded shadow px-5 py-6">
                <img className="w-20 h-20 rounded-full mx-auto mb-6" src="team-member-1.jpg" alt="Team Member"/>
                <h4 className="text-2xl text-gray-800 font-bold mb-1">John Doe</h4>
                <p className="text-gray-600 mb-4">CEO</p>
              </div>
            </div>

            {/* Repeat for other team members */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
