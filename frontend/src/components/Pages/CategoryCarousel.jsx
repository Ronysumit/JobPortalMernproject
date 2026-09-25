import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { setSearchedQuery } from '@/REDUX/jobSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "DotNet Developer",
    "MernStack Developer",
    "Java Developer"
]

function CategoryCarousel() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (search) => {
        dispatch(setSearchedQuery(search));
        navigate("/browse")
    }
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                    {
                        category.map((c, index) => {
                            return (
                                <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
                                    <Button onClick={()=>searchJobHandler(c)} variant='outline' className="rounded-full">{c}</Button>
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel