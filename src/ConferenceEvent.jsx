import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";

const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const venueItems = useSelector((state) => state.venue);
    const addonsItems = useSelector((state) => state.addons || []);
    const mealsItems = useSelector((state) => state.meals || []);
    const dispatch = useDispatch();
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

    
    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowItems(!showItems);
    };

    const handleAddToCart = (index) => {
        if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
          return; 
        }
        dispatch(incrementQuantity(index));
      };
    
      const handleRemoveFromCart = (index) => {
        if (venueItems[index].quantity > 0) {
          dispatch(decrementQuantity(index));
        }
      };

    const handleIncrementAvQuantity = (index) => {
        console.log(`Increment addon at index ${index}`);
    };

    const handleDecrementAvQuantity = (index) => {
        console.log(`Decrement addon at index ${index}`);
    };

    const handleMealSelection = (index) => {
        console.log(`Select meal at index ${index}`);
    };

    const getItemsFromTotalCost = () => {
        const items = [];
        venueItems.forEach(item => {
            if (item.quantity > 0) {
                items.push({...item, category: 'venue'});
            }
        });
        addonsItems.forEach(item => {
            if (item.quantity > 0) {
                items.push({...item, category: 'addons'});
            }
        });
        mealsItems.forEach(item => {
            if (item.quantity > 0) {
                items.push({...item, category: 'meals'});
            }
        });
        return items;
    };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {
        if (items.length === 0) {
            return <div className="no-items">No items selected</div>;
        }
        
        return (
            <div className="items-display">
                {items.map((item, index) => (
                    <div key={index} className="item-row">
                        <div className="item-name">{item.name}</div>
                        <div className="item-quantity">Quantity: {item.quantity}</div>
                        <div className="item-cost">Cost: ${item.cost * item.quantity}</div>
                        <div className="item-category">({item.category})</div>
                    </div>
                ))}
            </div>
        );
    };

    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
            venueItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "addons") {
            addonsItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "meals") {
            mealsItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        }
        return totalCost;
    };

    const venueTotalCost = calculateTotalCost("venue");

    const totalCosts = {
        venue: calculateTotalCost("venue"),
        addons: calculateTotalCost("addons"),
        meals: calculateTotalCost("meals"),
        total: calculateTotalCost("venue") + calculateTotalCost("addons") + calculateTotalCost("meals")
    };

    const navigateToProducts = (idType) => {
        if (idType === '#venue' || idType === '#addons' || idType === '#meals') {
            if (!showItems) {
                setShowItems(false);
            }
            setTimeout(() => {
                const element = document.querySelector(idType);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <>
            <navbar className="navbar_event_conference">
                <div className="company_logo">Conference Expense Planner</div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <a href="#venue" onClick={() => navigateToProducts("#venue")} >Venue</a>
                        <a href="#addons" onClick={() => navigateToProducts('#addons')}>Add-ons</a>
                        <a href="#meals" onClick={() => navigateToProducts('#meals')}>Meals</a>
                    </div>
                    <button className="details_button" onClick={() => setShowItems(!showItems)}>
                        Show Details
                    </button>
                </div>
            </navbar>
            <div className="main_container">
                {!showItems
                    ?
                    (
                        <div className="items-information">
                             <div id="venue" className="venue_container container_main">
        <div className="text">
          <h1>Venue Room Selection</h1>
        </div>
        <div className="venue_selection">
          {venueItems.map((item, index) => (
            <div className="venue_main" key={index}>
              <div className="img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="text">{item.name}</div>
              <div>${item.cost}</div>
     <div className="button_container">
        {venueItems[index].name === "Auditorium Hall (Capacity:200)" ? (

          <>
          <button
            className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
            onClick={() => handleRemoveFromCart(index)}
          >
            &#8211;
          </button>
          <span className="selected_count">
            {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
          </span>
          <button
            className={remainingAuditoriumQuantity === 0? "btn-success btn-disabled" : "btn-success btn-plus"}
            onClick={() => handleAddToCart(index)}
          >
            &#43;
          </button>
        </>
        ) : (
          <div className="button_container">
           <button
              className={venueItems[index].quantity ===0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
              onClick={() => handleRemoveFromCart(index)}
            >
               &#8211;
            </button>
            <span className="selected_count">
              {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
            </span>
            <button
              className={venueItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
              onClick={() => handleAddToCart(index)}
            >
             &#43;
            </button>
          </div>
        )}
      </div>
            </div>
          ))}
        </div>
        <div className="total_cost">Total Cost: ${venueTotalCost}</div>
      </div>

                            {/*Necessary Add-ons*/}
                            <div id="addons" className="venue_container container_main">
                                <div className="text">
                                    <h1>Add-ons Selection</h1>
                                </div>
                                <div className="addons_selection">
                                    <div className="addons-placeholder">
                                        <p>Addons selection will appear here</p>
                                        <p>Items: Projector, Speakers, Microphone, Whiteboard, Signs</p>
                                    </div>
                                </div>
                                <div className="total_cost">Total Cost: ${calculateTotalCost("addons")}</div>
                            </div>

                            {/* Meal Section */}
                            <div id="meals" className="venue_container container_main">
                                <div className="text">
                                    <h1>Meals Selection</h1>
                                </div>
                                <div className="input-container venue_selection">
                                    <div className="people-count">
                                        <label htmlFor="peopleCount">Number of People: </label>
                                        <input 
                                            type="number" 
                                            id="peopleCount" 
                                            min="1" 
                                            max="100" 
                                            value={numberOfPeople}
                                            onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                                        />
                                    </div>
                                </div>
                                <div className="meal_selection">
                                    <div className="meals-placeholder">
                                        <p>Meal selection will appear here</p>
                                        <p>Options: Breakfast, Lunch, Dinner, Snacks</p>
                                    </div>
                                </div>
                                <div className="total_cost">Total Cost: ${calculateTotalCost("meals")}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="total_amount_detail">
                            <TotalCost totalCosts={totalCosts} handleClick={handleToggleItems} ItemsDisplay={() => <ItemsDisplay items={items} />} />
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default ConferenceEvent;
