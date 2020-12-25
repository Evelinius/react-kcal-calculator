import React from 'react';
import FoodSelectorModal from '../foodSelector';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import './foodCards.css';
import { MenuItem } from '../mealtymenu';
import { Progress, ProgressItem } from '../ProgressBar/progressBar';
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';

export interface FoodCard {
    menuItem: MenuItem;
    color: string;
}

interface Props {
}

function FoodMenuComponent(props: Props) {
    const [open, setOpen] = React.useState(false);
    const [foodCards, setFoodCards] = React.useState([] as FoodCard[])
    const [showPercents, setShowPercents] = React.useState(true)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSelect = (menuItem: MenuItem) => {
        const card = { menuItem: menuItem, color: `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.5)` } as FoodCard;
        foodCards.push(card)
        setFoodCards(foodCards);
    }

    const randomColor = () => {
        let seed = Math.round(Math.random() * 255)
        return seed;
    }

    const deleteCard = (card: FoodCard) => () => {
        const newCards = foodCards.filter(f => f != card)
        setFoodCards(newCards);
    }

    const totalCalories = (props as any).kbgu?.calories;
    const totalProteins = (props as any).kbgu?.prot;
    const totalCarbs = (props as any).kbgu?.carbs;
    const totalFats = (props as any).kbgu?.fat;

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
                <Badge className="badge" badgeContent={'X'} onClick={deleteCard(i)} >
                    <div className="image-container">
                        <img className="image" src={"http://mealty.ru" + i.menuItem.image}></img>
                        <div style={{ backgroundColor: i.color, height: 18 }}>

                        </div>
                    </div>
              </Badge>)}
                <Button className="button" onClick={handleOpen}>
                    <AddIcon />
                </Button>
                <FoodSelectorModal onMenuSelect={handleSelect} open={open} handleClose={handleClose} />
            </div>
            <Button onClick={() => setShowPercents(!showPercents)}>
                    toggle
            </Button>
            <div>
                <div>
                    Calories
                </div>
                <Progress progress={getCaloriesProgress()} showPercents = {showPercents}></Progress>
                <div>
                    Prot
                </div>
                <Progress progress={getProtProgress()} showPercents = {showPercents}></Progress>
                <div>
                    Carbs
                </div>
                <Progress progress={getCarbsProgress()} showPercents = {showPercents}></Progress>
                <div>
                    Fat
                </div>
                <Progress progress={getFatsProgress()} showPercents = {showPercents}></Progress>
            </div>
        </div>
    )
}
const mapStateToProps = (state: any) => ({ kbgu: state?.kbgu })


export const FoodCards = connect(mapStateToProps, null)(FoodMenuComponent);

