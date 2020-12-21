import React from 'react';
import FoodSelectorModal from '../foodSelector';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import './foodCards.css';
import { MenuItem } from '../mealtymenu';
import { Progress, ProgressItem } from '../ProgressBar/progressBar';

export interface FoodCard {
    menuItem: MenuItem;
    color: string;
}
export function FoodMenuComponent() {
    const [open, setOpen] = React.useState(false);
    const [foodCards, setFoodCards] = React.useState([] as FoodCard[])
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSelect = (menuItem: MenuItem) => {
        const card = { menuItem: menuItem, color: `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 1)` } as FoodCard;
        foodCards.push(card)
        setFoodCards(foodCards);
    }

    const randomColor = () => {
        let seed = Math.round(Math.random() * 255)
        return seed;
    }

    const totalCalories = 2000;
    const totalProteins = 90;
    const totalCarbs = 160;
    const totalFats = 81;

    const getCaloriesProgress: () => ProgressItem[] = () => {
        const progress: ProgressItem[] = foodCards.map(c => {
            const progressItem = {} as ProgressItem;
            progressItem.color = c.color;
            progressItem.value = Math.round((c.menuItem.tCalories / totalCalories) * 100);

            return progressItem;
        })

        return progress;
    }

    const getProtProgress: () => ProgressItem[] = () => {
        const progress: ProgressItem[] = foodCards.map(p => {
            const progressItem = {} as ProgressItem;
            progressItem.color = p.color;
            progressItem.value = Math.round((p.menuItem.tProteins / totalProteins) * 100);

            return progressItem;
        })

        return progress;
    }

    const getCarbsProgress: () => ProgressItem[] = () => {
        const progress: ProgressItem[] = foodCards.map(c => {
            const progressItem = {} as ProgressItem;
            progressItem.color = c.color;
            progressItem.value = Math.round((c.menuItem.tCarbohydrates / totalCarbs) * 100);

            return progressItem;
        })

        return progress;
    }

    const getFatsProgress: () => ProgressItem[] = () => {
        const progress: ProgressItem[] = foodCards.map(f => {
            const progressItem = {} as ProgressItem;
            progressItem.color = f.color;
            progressItem.value = Math.round((f.menuItem.tFats / totalFats) * 100);

            return progressItem;
        })

        return progress;
    }

    return (
        <div>
            <div className="cards">
                {foodCards.map(i =>
                    <div className="image-container">
                        <img className="image" src={"http://mealty.ru" + i.menuItem.image}></img>
                        <div style={{ backgroundColor: i.color, height: 18 }}>

                        </div>
                    </div>)}
                <Button className="button" onClick={handleOpen}>
                    <AddIcon />
                </Button>
                <FoodSelectorModal onMenuSelect={handleSelect} open={open} handleClose={handleClose} />
            </div>
            <div>
                <div>
                    Calories
                </div>
                <Progress  progress={getCaloriesProgress()}></Progress>
                <div>
                    Prot
                </div>
                <Progress progress={getProtProgress()}></Progress>
                <div>
                    Carbs
                </div>
                <Progress progress={getCarbsProgress()}></Progress>
                <div>
                    Fat
                </div>
                <Progress progress={getFatsProgress()}></Progress>
            </div>
        </div>

    )
}