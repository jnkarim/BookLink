import React from 'react';
import { Star, ChevronDown, ArrowRight } from 'lucide-react';

const BookDetails = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      {/* Header with search and profile */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="eg. Harry Potter"
            className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-4">
            <button className="flex items-center px-6 py-2 bg-gray-900 text-white rounded-full">
              Byte <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button className="flex items-center px-6 py-2 border border-gray-300 rounded-full">
              Full Book <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          <button className="p-2 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-yellow-500 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Book content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book cover */}
        <div className="flex-shrink-0 w-full md:w-64">
          <img 
            src="https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
            alt="Harry Potter and the Chamber of Secrets" 
            className="w-full rounded-lg shadow-lg border-4 border-white"
          />
        </div>

        {/* Book details */}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-1">Harry Potter 2</h1>
          <p className="text-gray-600 mb-6">By J K Rowling</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">3.50</span>
            </div>
            <button className="flex items-center px-4 py-2 border rounded-full">
              No Shelf <ChevronDown className="ml-2 w-4 h-4" />
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Genres</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 border rounded-full">Fantasy</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veniam magni facilis commodi nobis, deserunt
              recusandae. Architecto harum nobis placeat quaerat corrupti voluptatibus exercitationem officiis impedit
              at, aut tenetur modi corporis consectetur illum blanditiis possimus quod quisquam optio quo sunt libero
              eius doloremque asperiores sit. Sed ipsum aspernatur voluptates suscipit vel illo, fugiat asperiores totam
              deserunt, aliquam adipisci rem eius sequi. Sint possimus obcaecati accusamus autem quo molestiae
              maiores soluta veritatis alias, laborum sequi asperiores distinctio numquam magni, earum exercitationem
              nisi natus a! Esse fugit eius repellat minima, commodi fuga dolorem explicabo provident ex, eveniet.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">About the Author</h2>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                  alt="J K Rowling" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">J K Rowling</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Joanne Rowling CH OBE FRSL (/ ˈroʊlɪŋ/; "rolling";[1] born 31 July 1965), better k...
                </p>
                <button className="px-4 py-1 border rounded-full text-sm">View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;