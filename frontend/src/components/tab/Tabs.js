import { useState, Children } from "react";
import { TabNavItem, TabContent, IconButton } from '../components';

const Tabs = ({children, addTab, removeTab, activeTab, setActiveTab}) => {
  // const [activeTab, setActiveTab] = useState('tab1');
  const arrayChildren = Children.toArray(children);

  return (
    <div className="tabs">
      <div className="tab-nav-container">
        <ul className="tab-nav">
          {Children.map(arrayChildren, (child, i) => {
            const { title } = child.props
            return (
              <TabNavItem 
                title={title} 
                id={`tab${i+1}`} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                removeTab={()=>removeTab(i)}
              />
            )
          })}
        </ul>
        <div className="tab-nav-filler">
          <div className="tab-add-button">
            <IconButton onClick={addTab} bkColor={'#e7e7e7'} />
          </div>
        </div>
      </div>
      
      <div className="tab-content">
        {Children.map(arrayChildren, (child, i) => {
          return (
            <TabContent id={`tab${i+1}`} activeTab={activeTab}>
              {child}
            </TabContent>
          )
        })}
      </div>

    </div>
  )
}

export default Tabs