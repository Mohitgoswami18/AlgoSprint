import python from "../assets/images/python.jpg";
import cpp from "../assets/images/cpp.jpg";
import c from "../assets/images/c.jpg";
import go from "../assets/images/go.jpg";
import php from "../assets/images/php.jpg";
import js from "../assets/images/js.jpg";
import java from "../assets/images/java.jpg";
import javaLogo from "../assets/images/javaLogo.png";
import pistonLogo from "../assets/images/piston.png";
import { TbArrowBarBoth } from "react-icons/tb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const LanguagesAvailable = () => {
  return (
    <div className="bg-slate-50 dark:bg-black font-[Inter] transition-colors duration-500 py-20 px-4 sm:px-10 lg:px-20">
      <h1 className="text-center font-bold text-3xl sm:text-4xl text-[#0e1d2e] dark:text-[#F7FAFC] pt-10 mb-4 transition-colors duration-500">
        Seamless Coding, Submission & Testing
      </h1>
      <p className="text-center font-semibold text-sm sm:text-md text-[#4A5568] dark:text-[#A0AEC0] max-w-2xl mx-auto tracking-tight">
        Write your code in your dominant language, compile it instantly, and
        validate it against real test cases — With built-in Judge0 integration,
        experience a smooth flow from coding to execution to verification.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
        <div className="flex flex-col items-center md:basis-2/5 w-full">
          <h2 className="text-center font-semibold text-xl text-[#0e1d2e] dark:text-[#F7FAFC] mb-4 transition-colors duration-500">
            Languages Available
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <div className="max-w-[100px] sm:max-w-[120px] h-20 flex items-center justify-center text-center p-2 sm:p-4 ring-[0.5px] ring-zinc-600 dark:ring-white/20 bg-white/50 dark:bg-white/10 rounded-full mx-auto transition-colors duration-500">
              <Carousel plugins={[Autoplay({ delay: 2000 })]}>
                <CarouselContent>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/c/00599C"
                      alt="C"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/cplusplus/00599C"
                      alt="C++"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/javascript/F7DF1E"
                      alt="JS"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/python/3776AB"
                      alt="Python"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/go/00ADD8"
                      alt="Go"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/php/777BB4"
                      alt="PHP"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src={javaLogo}
                      alt="Java"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>

            <div className="max-w-[300px] sm:max-w-[350px] h-[200px] sm:h-[220px] shadow-md flex items-center justify-center text-center px-2 py-1 ring-[0.5px] ring-zinc-600 dark:ring-white/20 bg-white/50 dark:bg-white/10 rounded-xl mx-auto transition-colors duration-500">
              <Carousel plugins={[Autoplay({ delay: 2000 })]}>
                <CarouselContent>
                  {[c, cpp, js, python, go, php, java].map((langImg, idx) => (
                    <CarouselItem key={idx}>
                      <img
                        src={langImg}
                        alt=""
                        className="rounded-md shadow-md w-full h-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>

        <div className="text-5xl sm:text-6xl my-6 md:my-0 flex justify-center items-center">
          <TbArrowBarBoth />
        </div>

        <div className="flex flex-col items-center md:basis-2/5 w-full">
          <h2 className="text-center font-semibold text-xl text-[#0e1d2e] dark:text-[#F7FAFC] mb-4 transition-colors duration-500">
            Validate against Test Cases
          </h2>
          <img
            src={pistonLogo}
            alt="Piston"
            className="rounded-md animate-pulse my-3 w-full max-w-[300px] sm:max-w-[350px]"
          />
        </div>
      </div>
    </div>
  );
};

export default LanguagesAvailable;
