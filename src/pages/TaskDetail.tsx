import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, ShoppingCart, AlertTriangle, Lightbulb } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useTask } from '../context/TaskContext';
import type { HardeningTask, Product } from '../types';

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { getTaskById, updateTaskCompletion } = useTask();
  const navigate = useNavigate();
  const [task, setTask] = useState<HardeningTask | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (id) {
      const foundTask = getTaskById(id);
      setTask(foundTask || null);
      
      if (foundTask) {
        const related = mockProducts.filter((product: Product) => 
          product.relatedTasks.includes(foundTask.id)
        );
        setRelatedProducts(related);
      }
    }
  }, [id, getTaskById]);

  // Keep local task state in sync with global context
  useEffect(() => {
    if (id) {
      const foundTask = getTaskById(id);
      setTask(foundTask || null);
    }
  }, [id, getTaskById]);

  if (!task) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Task not found</h1>
          <Link to="/" className="text-fire-600 hover:text-fire-700 mt-4 inline-block">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const steps = getTaskSteps(task);
  const safetyTips = getTaskSafetyTips(task);
  const benefits = getTaskBenefits(task);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const markTaskComplete = () => {
    if (task) {
      // Update the global task state
      updateTaskCompletion(task.id, true);
      // Update the local task state for immediate UI feedback
      setTask(prev => prev ? { ...prev, completed: true } : null);
    }
  };

  const markTaskIncomplete = () => {
    if (task) {
      // Update the global task state
      updateTaskCompletion(task.id, false);
      // Update the local task state for immediate UI feedback
      setTask(prev => prev ? { ...prev, completed: false } : null);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={handleBackToDashboard}
          className="flex items-center text-fire-600 hover:text-fire-700 mb-4 transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
            <p className="text-gray-600 text-lg">{task.description}</p>
          </div>
          
          {task.completed && (
            <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Task Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Task Overview</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-fire-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">+{task.resiliencyGain}%</div>
                <div className="text-sm text-gray-500">Resilience Gain</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">${task.estimatedCost}</div>
                <div className="text-sm text-gray-500">Est. Cost</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{task.timeRequired}</div>
                <div className="text-sm text-gray-500">Time Needed</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <AlertTriangle className={`w-6 h-6 mx-auto mb-2 ${
                  task.priority === 'high' ? 'text-red-600' : 
                  task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`} />
                <div className="text-2xl font-bold text-gray-900 capitalize">{task.priority}</div>
                <div className="text-sm text-gray-500">Priority</div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <Lightbulb className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Safety Tips</h4>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    {safetyTips.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <Link
                to={`/marketplace?task=${task.id}`}
                className="w-full flex items-center justify-center px-4 py-2 bg-fire-600 text-white rounded-md hover:bg-fire-700 transition-colors"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Shop Products
              </Link>
              
              {!task.completed ? (
                <button
                  onClick={markTaskComplete}
                  className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Complete
                </button>
              ) : (
                <button
                  onClick={markTaskIncomplete}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Mark Incomplete
                </button>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Products</h3>
              
              <div className="space-y-4">
                {relatedProducts.slice(0, 3).map(product => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="px-3 py-1 text-sm bg-fire-600 text-white rounded hover:bg-fire-700 disabled:bg-gray-300 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {relatedProducts.length > 3 && (
                <Link
                  to={`/marketplace?task=${task.id}`}
                  className="block text-center mt-4 text-fire-600 hover:text-fire-700"
                >
                  View all products →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Step-by-Step Guide</h2>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                index === currentStep ? 'border-fire-500 bg-fire-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <div className="flex items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0 ${
                  index === currentStep 
                    ? 'bg-fire-600 text-white' 
                    : index < currentStep 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  
                  {index === currentStep && step.details && (
                    <div className="mt-4 p-4 bg-white border border-fire-200 rounded-lg">
                      <div className="space-y-2 text-sm text-gray-700">
                        {step.details.map((detail: string, detailIndex: number) => (
                          <p key={detailIndex}>• {detail}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-6 pt-4 border-t">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Previous Step
          </button>
          
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-fire-600 text-white rounded-md hover:bg-fire-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper functions to generate content based on task
function getTaskSteps(task: HardeningTask) {
  const stepsByTask: { [key: string]: any[] } = {
    '1': [
      {
        title: 'Assess Current Vents',
        description: 'Inspect existing vents for gaps and vulnerability to ember intrusion.',
        details: [
          'Check all exterior vents including roof, eave, and foundation vents',
          'Look for gaps larger than 1/8 inch',
          'Note the current mesh size and material',
          'Document vent locations with photos'
        ]
      },
      {
        title: 'Purchase Materials',
        description: 'Select and order ember-resistant vent covers with proper mesh size.',
        details: [
          'Choose vents with 1/8 inch or smaller mesh',
          'Ensure materials are non-combustible (stainless steel or aluminum)',
          'Verify compatibility with existing vent openings',
          'Order extra screws and weatherproofing materials'
        ]
      },
      {
        title: 'Remove Old Vents',
        description: 'Carefully remove existing vents without damaging the structure.',
        details: [
          'Use appropriate tools (screwdriver, drill, pry bar)',
          'Remove screws and gently pry out old vents',
          'Clean the opening of debris and old caulk',
          'Inspect the opening for any damage'
        ]
      },
      {
        title: 'Install New Vents',
        description: 'Install ember-resistant vents ensuring proper fit and seal.',
        details: [
          'Test fit the new vent before final installation',
          'Apply weatherproof sealant around the opening',
          'Secure with corrosion-resistant screws',
          'Ensure proper airflow is maintained'
        ]
      },
      {
        title: 'Test and Inspect',
        description: 'Verify installation quality and proper function.',
        details: [
          'Check that all vents are securely fastened',
          'Verify no gaps exist around vent perimeters',
          'Test airflow to ensure ventilation is adequate',
          'Document completed work with photos'
        ]
      }
    ]
  };

  return stepsByTask[task.id] || [
    {
      title: 'Plan the Project',
      description: 'Research requirements and create a detailed project plan.'
    },
    {
      title: 'Gather Materials',
      description: 'Purchase all necessary materials and tools for the task.'
    },
    {
      title: 'Prepare the Area',
      description: 'Clear and prepare the work area for safe execution.'
    },
    {
      title: 'Execute the Work',
      description: 'Complete the hardening upgrade according to best practices.'
    },
    {
      title: 'Inspect and Test',
      description: 'Verify the work meets safety and building standards.'
    }
  ];
}

function getTaskSafetyTips(task: HardeningTask) {
  const tipsByCategory: { [key: string]: string[] } = {
    'Structural': [
      'Always use appropriate fall protection when working at height',
      'Turn off electrical power before working near electrical components',
      'Wear safety glasses and work gloves',
      'Check weather conditions before starting outdoor work'
    ],
    'Landscaping': [
      'Be aware of underground utilities before digging',
      'Wear appropriate protective equipment including gloves and eye protection',
      'Stay hydrated and take breaks in hot weather',
      'Be cautious when using power tools around plants and structures'
    ],
    'Fire Suppression': [
      'Follow all local fire codes and permit requirements',
      'Test water pressure before installing sprinkler systems',
      'Use only fire-rated materials and components',
      'Ensure proper electrical connections for automated systems'
    ]
  };

  return tipsByCategory[task.category] || [
    'Always prioritize safety over speed',
    'Use appropriate personal protective equipment',
    'Follow manufacturer instructions carefully',
    'Consult professionals when in doubt'
  ];
}

function getTaskBenefits(task: HardeningTask) {
  const benefitsByTask: { [key: string]: string[] } = {
    '1': [
      'Prevents ember intrusion through ventilation openings',
      'Maintains proper airflow while improving fire resistance',
      'May qualify for insurance discounts',
      'Relatively quick and cost-effective upgrade'
    ],
    '2': [
      'Creates a buffer zone that slows fire spread',
      'Reduces radiant heat exposure to your home',
      'Improves property aesthetics and value',
      'Provides easier access for firefighters'
    ],
    '3': [
      'Significantly reduces roof ignition risk',
      'May qualify for substantial insurance discounts',
      'Increases overall property value',
      'Provides long-term durability and protection'
    ]
  };

  return benefitsByTask[task.id] || [
    `Increases home resilience by ${task.resiliencyGain}%`,
    'Reduces wildfire risk to your property',
    'May qualify for insurance premium reductions',
    'Protects your investment and family safety'
  ];
}
