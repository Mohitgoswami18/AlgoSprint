import python from "../assets/images/python.jpg";
import cpp from "../assets/images/cpp.jpg";
import c from "../assets/images/c.jpg";
import go from "../assets/images/go.jpg";
import php from "../assets/images/php.jpg";
import js from "../assets/images/js.jpg";
import java from "../assets/images/java.jpg";
import pistonLogo from "../assets/images/piston.png"
import { TbArrowBarBoth } from "react-icons/tb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const LanguagesAvailable = () => {
  return (
    <div className="bg-slate-50 py-30 dark:bg-black font-[Inter] px-20 transition-colors duration-500">
      <h1 className="text-center font-bold text-4xl text-[#0e1d2e] dark:text-[#F7FAFC] pt-20 transition-colors duration-500">
        Seamless Coding, Submission & Testing
      </h1>
      <p className="text-center font-bold p-2 text-sm text-[#4A5568] dark:text-[#A0AEC0] px-[300px] tracking-tight">
        Write your code in your dominant language, compile it instantly, and
        validate it against real test cases — With built-in Judge0 integration,
        experience a smooth flow from coding to execution to verification.
      </p>

      <div className="flex items-center justify-center gap-4 mt-12">
        <div className="max-w-[500px] basis-[40%] items-center justify-center flex flex-col">
          <h1 className="text-center font-semibold text-xl text-[#0e1d2e] dark:text-[#F7FAFC] transition-colors duration-500">
            Languages Available
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            {/* Logos Carousel */}
            <div className="max-w-[100px] h-20 flex items-center justify-center text-center p-4 ring-[0.5px] ring-zinc-600 dark:ring-white/20 bg-white/50 dark:bg-white/10 rounded-full mx-auto  transition-colors duration-500">
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
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/cplusplus/00599C"
                      alt="C++ logo"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/javascript/F7DF1E"
                      alt="JavaScript logo"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/python/3776AB"
                      alt="Python logo"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/go/00ADD8"
                      alt="Go logo"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/php/777BB4"
                      alt="PHP logo"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://cdn.simpleicons.org/java/007396"
                      alt="Java logo"
                      width="50"
                      className="rounded-md"
                    />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>

            {/* Code Type Carousel */}
            <div className="max-w-[300px] h-[200px] shadow-md flex items-center justify-center text-center px-2 py-1 ring-[0.5px] ring-zinc-600 dark:ring-white/20 bg-white/50 dark:bg-white/10 rounded-xl mx-auto transition-colors duration-500">
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
                      src={c}
                      alt=""
                      className="rounded-md shadow-md w-full"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src={cpp}
                      alt=""
                      className="rounded-md shadow-md w-full"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src={js}
                      alt=""
                      className="rounded-md shadow-md w-full"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src={python}
                      alt=""
                      className="rounded-md shadow-md w-full"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src={go}
                      alt=""
                      className="rounded-md shadow-md w-full"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src={php}
                      alt=""
                      className="rounded-md shadow-md w-full"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src={java}
                      alt=""
                      className="rounded-md shadow-md w-full"
                    />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>

        <p className="text-7xl basis-[10%]">
          <TbArrowBarBoth />
        </p>

        <div className="basis-[40%] flex flex-col">
          <h1 className="text-center font-semibold text-xl text-[#0e1d2e] dark:text-[#F7FAFC] transition-colors duration-500">
            Validate againts Test cases with
          </h1>
          <img
            src={pistonLogo}
            alt=""
            className="rounded-md animate-pulse my-3 animation-duration-[6s]"
          />
        </div>
      </div>
    </div>
  );
};

export default LanguagesAvailable;
