import './App.css'
import Article from './components/Article'
import Callout from './components/Callout'
import H1 from './components/H1'
import H2 from './components/H2'
import H3 from './components/H3'
import P from './components/P'
import { CopyBlock, atomOneDark } from 'react-code-blocks'

function App() {

  return (
    <>
      <H1 text='Aprender Meilisearch + Livewire' />

      <Article>
        <div className='pb-12'>
          <P>Básicamente nos permite poder realizar filtrados.</P>
          <img src="search_example.gif" alt="milesearch + livewire example" className="max-w-screen-sm rounded-lg shadow-2xl" />
        </div>

        <P>Vamos a necesitar un proyecto de laravel.</P>

        <div className='pb-12'>
          <H2 text='Instalar meilisearch' />
          <P>Tenemos varias opciones</P>
          <ul className='pb-6' >
            <li className='py-1 px-2 my-2 rounded bg-slate-300 w-fit'>cURL</li>
            <li className='py-1 px-2 my-2 rounded bg-slate-300 w-fit'>homebrew</li>
            <li className='py-1 px-2 my-2 rounded bg-slate-300 w-fit'>docker</li>
            <li className='py-1 px-2 my-2 rounded bg-slate-300 w-fit'>apt</li>
            <li className='py-1 px-2 my-2 rounded bg-slate-300 w-fit'>source</li>
            <li className='py-1 px-2 my-2 rounded bg-slate-300 w-fit'>windows</li>
          </ul>
          <P>Una vez instalado, accedemos a <strong>localhost:7700</strong></P>
          <a href="https://www.meilisearch.com/docs/learn/getting_started/installation" className='rounded py-2 px-1 bg-teal-200 hover:bg-teal-300 hover:cursor-pointer'>&#x1F449;
            Ir a cada instalación según el tipo</a>
        </div>


        <div className='pb-12'>
          <H2 text='Instalar scout en el proyecto' />
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              marginBottom: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='bash'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`composer require laravel/scout`} />

          <CopyBlock
            customStyle={{
              marginTop: '25px',
              marginBottom: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='bash'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`php artisan vendor:publish --provider="Laravel\\Scout\\ScoutServiceProvider"`} />
        </div>

        <div className='pb-12'>
          <H2 text='Añadir Searchable' />
          <P>Esto es sobre el Modelo</P>
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              marginBottom: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='php'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`
    <?php
 
    namespace App\\Models;
    
    use Illuminate\\Database\\Eloquent\\Model;
    use Laravel\\Scout\\Searchable;
    
    class Question extends Model
    {
        use Searchable;
    }
`} />
        </div>

        <div className='pb-12'>
          <H2 text='Instalar el driver de meilisearch' />
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              marginBottom: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='bash'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`composer require meilisearch/meilisearch-php http-interop/http-factory-guzzle`} />
        </div>

        <div className='pb-12'>
          <H2 text='Actualizar .env' />
          <P>Debemos añadir estos nuevos datos a nuestro .env</P>
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              marginBottom: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='bash'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`
    SCOUT_DRIVER=meilisearch
    MEILISEARCH_HOST=http://127.0.0.1:7700

`} />
        </div>

        <div className='pb-12'>
          <H2 text='Añadir searchableAs al Modelo' />
          <P>El questions de return debe ser reemplazado por el nombre de la tabla que queramos hacer el filtrado. En mi caso es sobre la tabla questions.</P>
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              marginBottom: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='php'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`
    <?php
 
    namespace App\\Models;
             
    use Illuminate\\Database\\Eloquent\\Model;
    use Laravel\\Scout\\Searchable;
             
    class Question extends Model
    {
        use Searchable;
             
        /**
        * Get the name of the index associated with the model.
        */
        public function searchableAs(): string
        {
            return 'questions_index';
        }
    }

`} />
          <Callout text='Si no tengo la bd, la creo y tengo que correr sus migraciones y seeders' />

        </div>


        <div className='pb-12'>
          <H2 text='Importar el modelo' />
          <P>Importar el modelo sobre el que trabajamos</P>
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='bash'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`php artisan scout:import "App\\Models\\Question"`} />
        </div>

        <div className='pb-12'>
          <P>Si accedemos a localhost:7700, y hacemos F5, podrás observar que tenemos todos los
            datos de la tabla del Modelo importados.</P>
          <Callout text='Prueba a hacer pruebas de filtrados en el input del localhost:7700' />
        </div>

        <div className='pb-12'>
          <H2 text='Instalar livewire' />
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='bash'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`composer require livewire/livewire`} />
        </div>

        <div className='pb-12'>
          <P>Debo incluir esto en cada página que lo necesite:</P>
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              marginBottom: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='php'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`
    ..
        @livewireStyles
    </head>
    <body>
        ...
         
        @livewireScripts
    </body>
    </html>
    `} />
        </div>

        <div className='pb-12'>
          <H2 text='Componente de búsqueda' />
          <P>Procedo a crear el componente de búsqueda</P>
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              marginBottom: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='bash'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`php artisan make:livewwire SearchQuestions`} />

          <P>Implemento mi componente creado en la vista que lo necesite.</P>
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              marginBottom: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='php'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`@livewire('search-questions')`} />

          <H3 text='Vista del componente' />
          <P>Es un input donde el cliente introduze sus filtros. Esto se vincula gracias al <strong>wire:model="search"</strong> y al <strong>type="search"</strong></P>
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              marginBottom: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='php'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`
    <div>
        <input wire:model="search" type="search" placeholder="Search questions...">
    
        <h1>Search Results:</h1>
    
        <ul>
            @foreach($questions as $questions)
                <li>{{ $question->title }}</li>
                <li>{{ $question->description }}</li>
            @endforeach
        </ul>
    </div>

`} />

          <H3 text='Clase del componente' />
          <P>Deben <strong>coincidir</strong> el nombre del <strong>wire:model</strong> de la vista y el <strong>queryString</strong></P>
          <CopyBlock
            customStyle={{
              marginTop: '25px',
              marginBottom: '25px',
              overflowY: 'scroll',
              borderRadius: '15px',
            }}
            codeBlock={true}
            language='php'
            showLineNumbers={false}
            theme={atomOneDark}
            text={`
    use App\\Models\\Question;
    use Livewire\\Component;

    class SearchQuestions extends Component
    {
        public $search;
    
        protected $queryString = ['search'];
    
        public function render()
        {
            $questions = [];
            if($this->search){
                // lo que se introduzca en el input de la vista, lo busca aquí
                $questions = Question::search($this->search)->get();
            }

            return view('livewire.search-posts', compact('questions'));
        }
    }

`} />

          <P>Ahora dirígete a localhost:7700 y prueba</P>
        </div>

      </Article>
    </>
  )
}

export default App
