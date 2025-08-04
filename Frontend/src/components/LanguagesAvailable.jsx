import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


const LanguagesAvailable = () => {
  return (
    <div className="bg-[#0e1d2e] font-[Inter]">
      <h1 className="text-center font-bold text-4xl text-[#F7FAFC] pt-20">
        Language Supported
      </h1>
      <div className="flex items-center justify-between">
        <div className="max-w-[100px] h-12 flex items-center justify-center m-4 mt-12 text-center p-4 backdrop-blur-2xl bg-white/10 rounded-xl mx-auto border-2">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>Python</CarouselItem>
              <CarouselItem>c</CarouselItem>
              <CarouselItem>c++</CarouselItem>
              <CarouselItem>Java</CarouselItem>
              <CarouselItem>Javascript</CarouselItem>
              <CarouselItem>go</CarouselItem>
              <CarouselItem>php</CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

        <div className="max-w-[100px] h-12 flex items-center justify-center m-4 mt-12 text-center p-4 backdrop-blur-2xl bg-white/10 rounded-xl mx-auto border-2">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>Python Code</CarouselItem>
              <CarouselItem>c code</CarouselItem>
              <CarouselItem>c++ code</CarouselItem>
              <CarouselItem>Java code</CarouselItem>
              <CarouselItem>Javascript code</CarouselItem>
              <CarouselItem>go code</CarouselItem>
              <CarouselItem>php code</CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default LanguagesAvailable
