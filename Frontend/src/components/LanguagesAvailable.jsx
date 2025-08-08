// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";


// const LanguagesAvailable = () => {
//   return (
//     <div className="bg-[#0e1d2e] font-[Inter]">
//       <h1 className="text-center font-bold text-4xl text-[#F7FAFC] pt-20">
//         Language Supported
//       </h1>
//       <div className="flex items-center border-2 justify-between border-red-300 max-w-[600px] mx-auto justify-center gap-12 mt-10">
//         <div className="max-w-[100px] h-20 border-red-400 flex items-center justify-center mt-12 text-center p-4 backdrop-blur-2xl bg-black rounded-full mx-auto border-2">
//           <Carousel
//             plugins={[
//               Autoplay({
//                 delay: 2000,
//               }),
//             ]}
//           >
//             <CarouselContent>
//               <CarouselItem>
//                 <img
//                   src="https://cdn.simpleicons.org/c/00599C"
//                   alt="C logo"
//                   width="50"
//                 />
//               </CarouselItem>
//               <CarouselItem>
//                 <img
//                   src="https://cdn.simpleicons.org/cplusplus/00599C"
//                   alt="C++ logo"
//                   width="50"
//                 />
//               </CarouselItem>
//               <CarouselItem>
//                 <img
//                   src="https://cdn.simpleicons.org/javascript/F7DF1E"
//                   alt="JavaScript logo"
//                   width="50"
//                 />
//               </CarouselItem>
//               <CarouselItem>
//                 <img
//                   src="https://cdn.simpleicons.org/python/3776AB"
//                   alt="Python logo"
//                   width="50"
//                 />
//               </CarouselItem>
//               <CarouselItem>
//                 <img
//                   src="https://cdn.simpleicons.org/go/00ADD8"
//                   alt="Go logo"
//                   width="50"
//                 />
//               </CarouselItem>
//               <CarouselItem>
//                 <img
//                   src="https://cdn.simpleicons.org/php/777BB4"
//                   alt="PHP logo"
//                   width="50"
//                 />
//               </CarouselItem>
//               <CarouselItem>
//                 <img
//                   src="https://www.svgrepo.com/show/32690/java.svg"
//                   alt="Java logo"
//                   width="32"
//                   height="32"
//                 />
//               </CarouselItem>
//             </CarouselContent>
//           </Carousel>
//         </div>

//         <div className="max-w-[300px] h-[200px] border-blue-900 flex items-center justify-center mt-12 text-center p-4 backdrop-blur-2xl bg-white/10 rounded-xl mx-auto border-2">
//           <Carousel
//             plugins={[
//               Autoplay({
//                 delay: 2000,
//               }),
//             ]}
//           >
//             <CarouselContent>
//               <CarouselItem>Python Code</CarouselItem>
//               <CarouselItem>c code</CarouselItem>
//               <CarouselItem>c++ code</CarouselItem>
//               <CarouselItem>Java code</CarouselItem>
//               <CarouselItem>Javascript code</CarouselItem>
//               <CarouselItem>go code</CarouselItem>
//               <CarouselItem>php code</CarouselItem>
//             </CarouselContent>
//           </Carousel>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LanguagesAvailable
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const LanguagesAvailable = () => {
  return (
    <div className="bg-white dark:bg-[#0e1d2e] font-[Inter] transition-colors duration-500">
      <h1 className="text-center font-bold text-4xl text-[#0e1d2e] dark:text-[#F7FAFC] pt-20 transition-colors duration-500">
        Language Supported
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-10">
        {/* Logos Carousel */}
        <div className="max-w-[100px] h-20 flex items-center justify-center text-center p-4 backdrop-blur-2xl bg-gray-200 dark:bg-black/70 rounded-full mx-auto border-2 border-gray-400 dark:border-red-400 transition-colors duration-500">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <img
                  src="https://cdn.simpleicons.org/c/00599C"
                  alt="C logo"
                  width="50"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://cdn.simpleicons.org/cplusplus/00599C"
                  alt="C++ logo"
                  width="50"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://cdn.simpleicons.org/javascript/F7DF1E"
                  alt="JavaScript logo"
                  width="50"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://cdn.simpleicons.org/python/3776AB"
                  alt="Python logo"
                  width="50"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://cdn.simpleicons.org/go/00ADD8"
                  alt="Go logo"
                  width="50"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://cdn.simpleicons.org/php/777BB4"
                  alt="PHP logo"
                  width="50"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://cdn.simpleicons.org/java/007396"
                  alt="Java logo"
                  width="50"
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

        {/* Code Type Carousel */}
        <div className="max-w-[300px] h-[200px] flex items-center justify-center text-center p-4 backdrop-blur-2xl bg-white/50 dark:bg-white/10 rounded-xl mx-auto border-2 border-blue-800 dark:border-blue-900 transition-colors duration-500">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>Python Code</CarouselItem>
              <CarouselItem>C Code</CarouselItem>
              <CarouselItem>C++ Code</CarouselItem>
              <CarouselItem>Java Code</CarouselItem>
              <CarouselItem>JavaScript Code</CarouselItem>
              <CarouselItem>Go Code</CarouselItem>
              <CarouselItem>PHP Code</CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default LanguagesAvailable;
